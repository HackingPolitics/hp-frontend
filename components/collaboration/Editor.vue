<template>
  <div id="proposal-collab">
    <h2 class="text-2xl py-4 font-normal mt-4 text-blue-gray-900">
      Einführung
    </h2>

    <div v-if="introductionEditor" class="editor">
      <collaboration-menu-bar
        class="editor__header"
        :editor="introductionEditor"
      />
      <editor-content class="editor__content" :editor="introductionEditor" />
      <div class="editor__footer">
        <div :class="`editor__status editor__status--${status}`">
          <template v-if="status === 'connected'">
            {{ states.length }} user{{ states.length === 1 ? '' : 's' }} online
          </template>
          <template v-else> offline </template>
        </div>
      </div>
    </div>
    <h2 class="text-2xl py-4 font-normal mt-4 text-blue-gray-900">Grund</h2>
    <div v-if="reasoningEditor" class="editor">
      <collaboration-menu-bar
        class="editor__header"
        :editor="reasoningEditor"
      />
      <editor-content class="editor__content" :editor="reasoningEditor" />
      <div class="editor__footer">
        <div :class="`editor__status editor__status--${status}`">
          <template v-if="status === 'connected'">
            {{ states.length }} user{{ states.length === 1 ? '' : 's' }} online
          </template>
          <template v-else> offline </template>
        </div>
      </div>
    </div>
    <h2 class="text-2xl py-4 font-normal mt-4 text-blue-gray-900">
      Handlungsauftrag
    </h2>
    <div v-if="actionMandateEditor" class="editor">
      <collaboration-menu-bar
        class="editor__header"
        :editor="actionMandateEditor"
      />
      <editor-content class="editor__content" :editor="actionMandateEditor" />
      <div class="editor__footer">
        <div :class="`editor__status editor__status--${status}`">
          <template v-if="status === 'connected'">
            {{ states.length }} user{{ states.length === 1 ? '' : 's' }} online
          </template>
          <template v-else> offline </template>
        </div>
      </div>
    </div>

    <h2 class="text-2xl py-4 font-normal mt-4 text-blue-gray-900">
      Bearbeitungskommentar
    </h2>
    <div v-if="commentEditor" class="editor">
      <collaboration-menu-bar class="editor__header" :editor="commentEditor" />
      <editor-content class="editor__content" :editor="commentEditor" />
      <div class="editor__footer">
        <div :class="`editor__status editor__status--${status}`">
          <template v-if="status === 'connected'">
            {{ states.length }} user{{ states.length === 1 ? '' : 's' }} online
          </template>
          <template v-else> offline </template>
        </div>
      </div>
    </div>

    <div class="h-8"></div>
  </div>
</template>

<script>
import { Editor, EditorContent } from '@tiptap/vue-2'
import StarterKit from '@tiptap/starter-kit'
import Collaboration from '@tiptap/extension-collaboration'
import CollaborationCursor from '@tiptap/extension-collaboration-cursor'
import Highlight from '@tiptap/extension-highlight'
import CharacterCount from '@tiptap/extension-character-count'
import * as Y from 'yjs'
import { defineComponent } from '@nuxtjs/composition-api'
import { cloneDeep } from 'lodash'
import {
  HocuspocusProvider,
  WebSocketStatus,
} from '~/services/hocuspocus/HocuspocusProvider'
import { TokenUpdateMessage } from '~/services/hocuspocus/OutgoingMessages/TokenUpdateMessage'

// @todo remove, testing only
const getRandomElement = (list) => {
  return list[Math.floor(Math.random() * list.length)]
}

// @todo Philipp ggf refactoren, verschieben, umbenennen, ...
const reduceStates = (clients) => {
  const areas = {}
  const fields = {}
  const users = {}

  for (const client of clients) {
    // ein Benutzer kann mit mehreren Clients online sein -> reduce
    if (!users[client.user.id]) {
      users[client.user.id] = { ...client.user }
    }

    // Ein Benutzer muss nicht zwingend in einem (relevanten) Bereich sein,
    // ausserdem kann ein Benutzer mit mehreren Clients online sein und daher in
    // mehreren Bereichen auftauchen
    if (client.user.area) {
      // Bereich wurde noch nie benutzt, erstmal anlegen...
      if (!areas[client.user.area]) {
        areas[client.user.area] = {}
      }

      // ein Benutzer kann mit mehreren Clients online & im gleichen Bereich sein -> reduce
      if (!areas[client.user.area][client.user.id]) {
        areas[client.user.area][client.user.id] = { ...client.user }
      }
    }

    // Ein Benutzer kann mit mehreren Clients online sein, jeder Client kann aber immer nur ein
    // Feld sperren -> der User kann nur mit dem Cursor in einem Feld sein etc., oder aber in keinem
    if (client.user.lockedField) {
      // Feld wurde noch nie benutzt, erstmal anlegen...
      if (!fields[client.user.lockedField]) {
        fields[client.user.lockedField] = {
          locked: false,
          since: null,
          by: null,
        }
      }

      if (
        // es ist bisher nicht gesperrt
        !fields[client.user.lockedField].locked ||
        // oder der aktuelle client hat es später gelocked (um User rausschmeissen zu können
        // die längere Zeit inaktiv sind, aktive Clients sollten ihren eigenen lockedSince-Stempel
        // regelmässig aktualisieren, bspw mittels debounce wenn im Feld getippt wird)
        fields[client.user.lockedField].since < client.user.lockedSince
      ) {
        fields[client.user.lockedField] = {
          locked: true,
          since: client.user.lockedSince,
          by: client.user.username,
        }
      }
    }
  }

  return { areas, fields, users }
}

export default defineComponent({
  components: {
    EditorContent,
  },
  data() {
    return {
      // Der Status des aktuellen Users im aktuellen Client: Wo in der Anwendung ist er,
      // welches Feld bearbeitet er gerade, welche Farbe wurde ihm zugewiesen (Cursor im WYSIWYG).
      // Sollte von der App mittels setAwarenessState() aktualisiert werden, das sendet das Update
      // gleichzeitig an alle User.
      // Wird
      currentUser: {
        username: this.$auth.user.username || '[not logged in]',
        firstName: this.$auth.user.firstName,
        lastName: this.$auth.user.lastName,
        id: this.$auth.user.id | 0,
        color: this.getRandomColor(),
        lockedField: null,
        lockedSince: null,
        area: null,
      },

      provider: null,
      yDoc: null,

      actionMandateEditor: null,
      introductionEditor: null,
      reasoningEditor: null,
      commentEditor: null,

      // holds the timestamp when the WS server last sent the data (successfully) to the backend
      savedAt: -1,

      // connecting | connected | disconnected
      status: 'connecting',

      // holds the list of unmodified states
      states: [],

      // holds the decomposed awarenessStates
      areas: {},
      lockedFields: {},
      onlineUsers: {},

      // internal
      syncState: null,
      timer: null,

      projectId: this.$route.params.id,
      proposalId: this.$route.params.proposalId,
    }
  },

  async mounted() {
    await this.$auth.refreshTokens()

    this.$store.commit(
      'collaboration/SET_CURRENT_AREA',
      'proposal/' + this.proposalId
    )

    this.ydoc = new Y.Doc()
    this.syncState = this.ydoc.getMap('syncState')

    this.ydoc.on('update', () => {
      this.savedAt = this.syncState.get('savedAt')
    })

    // @todo Philipp: Aufteilen auf 2 Provider, einen mit project-X für den Awareness-State
    // für alle user, bereiche und gesperrte Formfields der dauerhaft in der App gemounted ist auch
    // bei Seitenwechsel. Und einen für das jeweilige proposal-x das bearbeitet werden soll, dort
    // sollten nur die Editoren dranhängen, kann also hier auf der  Seite bleiben wenn das
    // die Antragstext-Seite ist.
    if (!isNaN(this.proposalId)) {
      this.provider = new HocuspocusProvider({
        url: this.$config.WS_URL,
        name: 'proposal-' + this.proposalId,
        document: this.ydoc,
        parameters: { authToken: this.getToken() },
        onConnect: () => {
          this.status = 'connected'
        },
        onMessage: ({ _event, _message }) => {
          // any document update is applied *after* this hook
          // console.log(`[message] ◀️ ${message.name}`, event)
        },
        onOutgoingMessage: ({ _message }) => {
          // console.info(`[message] ▶️ ${message.name} (${message.description})`)
        },
        onClose: ({ event }) => {
          // hocuspocus-server/CloseEvent.ts:Forbidden
          if (event.code === 4403) {
            // prevent the provider from endlessly retrying
            this.provider.disconnect()
            // eslint-disable-next-line no-console
            console.log('WS disconnected, authentication failure')
          }

          this.status = 'disconnected'
        },
        onDisconnect: () => {
          if (this.provider.shouldConnect) {
            // eslint-disable-next-line no-console
            console.log(
              'WS connection closed unexpectedly, trying to reconnect...'
            )
          }
        },
        onAwarenessChange: ({ states }) => {
          this.states = states
          const reduced = reduceStates(states)
          this.areas = reduced.areas
          this.lockedFields = reduced.fields
        },
      })
    }
    this.actionMandateEditor = new Editor({
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        Highlight,
        CharacterCount.configure({
          limit: 10000,
        }),
        Collaboration.configure({
          document: this.ydoc,
          field: 'actionMandate',
        }),
        CollaborationCursor.configure({
          provider: this.provider,
          user: this.currentUser,
        }),
      ],
    })

    this.introductionEditor = new Editor({
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        Highlight,
        CharacterCount.configure({
          limit: 10000,
        }),
        Collaboration.configure({
          document: this.ydoc,
          field: 'introduction',
        }),
        CollaborationCursor.configure({
          provider: this.provider,
          user: this.currentUser,
        }),
      ],
    })

    this.reasoningEditor = new Editor({
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        Highlight,
        CharacterCount.configure({
          limit: 10000,
        }),
        Collaboration.configure({
          document: this.ydoc,
          field: 'reasoning',
        }),
        CollaborationCursor.configure({
          provider: this.provider,
          user: this.currentUser,
        }),
      ],
    })

    this.commentEditor = new Editor({
      extensions: [
        StarterKit.configure({
          history: false,
        }),
        Highlight,
        CharacterCount.configure({
          limit: 10000,
        }),
        Collaboration.configure({
          document: this.ydoc,
          field: 'comment',
        }),
        CollaborationCursor.configure({
          provider: this.provider,
          user: this.currentUser,
        }),
      ],
    })

    // @todo Philipp: how can we listen to token changes instead of polling?
    // * localStorage eventListener only triggers when the change occured in another tab
    // * $auth.$storage.watchState() did not trigger in tests (with: token, _token, _token.local, auth._token.local as key)
    this.timer = setTimeout(this.sendTokenUpdate.bind(this), 5000)

    // damit schon mal alle die Userdaten bekommen und nicht nur den leeren User ("not logged in")
    this.setAwarenessState()
  },

  beforeDestroy() {
    this.editor && this.editor.destroy()
    this.provider && this.provider.destroy()
    this.timer && clearTimeout(this.timer)
  },

  methods: {
    /**
     * When the JWT changed through refreshes & if the provider is connected, send him
     * the new token via a special message.
     *
     * If the token is reset, disconnect the provider, the user should not receive any more updates
     * from the other team members.
     *
     * The WS server needs a JWT to send the document updates to the API server (debounced & bundled),
     * for this he needs a valid token to impersonate a team member. Because he cannot access a
     * (eventually updated) cookie or the request parameters for an already opened connection we have
     * to send it directly.
     *
     * The WS server will disconnect us if our new token no longer allows us in the current room or
     * if our last token expired without receiving a new one.
     */
    sendTokenUpdate() {
      // @todo how can we listen to token changes instead of polling?
      // * localStorage eventListener only triggers when the change occured in another tab
      // * $auth.$storage.watchState() did not trigger in tests (with: token, _token, _token.local, auth._token.local as key)
      this.timer = setTimeout(this.sendTokenUpdate.bind(this), 5000)

      const current = this.getToken()
      if (this.provider.options.parameters.authToken === current) {
        // token did not change since the last check
        return
      }

      // update the options, even if the WS server does not receive this, so we can compare
      // any new values and also if the connection is dropped the provider can reconnect
      // with a valid token
      this.provider.options.parameters.authToken = current

      if (this.provider.status !== WebSocketStatus.Connected) {
        return
      }

      if (!current) {
        this.provider.disconnect()
        return
      }

      this.provider.send(TokenUpdateMessage, { token: current })
    },

    // nuxt/auth stores & returns the token with the "Bearer" prefix, remove it as the
    // WS server does not expect it
    getToken() {
      const prefixed = this.$auth.strategy.token.get() || ''
      return prefixed.replace(`${this.$auth.strategy.options.token.type} `, '')
    },

    setAwarenessState(values = {}) {
      this.currentUser = {
        ...this.currentUser,
        ...values,
      }
      this.provider.setAwarenessField('user', this.currentUser)
    },

    getRandomColor() {
      return getRandomElement([
        '#958DF1',
        '#F98181',
        '#FBBC88',
        '#FAF594',
        '#70CFF8',
        '#94FADB',
        '#B9F18D',
      ])
    },
  },
})
</script>

<style lang="scss" scoped>
.editor {
  display: flex;
  flex-direction: column;
  //   height: 50%;
  margin-bottom: 2rem;
  color: #0d0d0d;
  background-color: #fff;

  &__header {
    display: flex;
    align-items: center;
    flex: 0 0 auto;
    flex-wrap: wrap;
    padding: 0.25rem;
    border-bottom: 3px solid #0d0d0d;
  }

  &__content {
    padding: 1.25rem 1rem;
    flex: 1 1 auto;
    overflow-x: hidden;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  &__footer {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    white-space: nowrap;
    border-top: 3px solid #0d0d0d;
    font-size: 12px;
    font-weight: 600;
    color: #0d0d0d;
    padding: 0.25rem 0.75rem;
  }

  /* Some information about the status */
  &__status {
    display: flex;
    align-items: center;
    border-radius: 5px;

    &::before {
      content: ' ';
      flex: 0 0 auto;
      display: inline-block;
      width: 0.5rem;
      height: 0.5rem;
      background: rgba(#0d0d0d, 0.5);
      border-radius: 50%;
      margin-right: 0.5rem;
    }

    &--connecting::before {
      background: #616161;
    }

    &--connected::before {
      background: #b9f18d;
    }
  }

  &__name {
    button {
      background: none;
      border: none;
      font: inherit;
      font-size: 12px;
      font-weight: 600;
      color: #0d0d0d;
      border-radius: 0.4rem;
      padding: 0.25rem 0.5rem;

      &:hover {
        color: #fff;
        background-color: #0d0d0d;
      }
    }
  }
}
</style>

<style lang="scss">
/* Give a remote user a caret */
.collaboration-cursor__caret {
  position: relative;
  margin-left: -1px;
  margin-right: -1px;
  border-left: 1px solid #0d0d0d;
  border-right: 1px solid #0d0d0d;
  word-break: normal;
  pointer-events: none;
}

/* Render the username above the caret */
.collaboration-cursor__label {
  position: absolute;
  top: -1.4em;
  left: -1px;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  user-select: none;
  color: #0d0d0d;
  padding: 0.1rem 0.3rem;
  border-radius: 3px 3px 3px 0;
  white-space: nowrap;
}

/* Basic editor styles */
.ProseMirror {
  > * + * {
    margin-top: 0.75em;
  }

  ul,
  ol {
    padding: 0 1rem;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 1.1;
  }

  code {
    background-color: rgba(#616161, 0.1);
    color: #616161;
  }

  pre {
    background: #0d0d0d;
    color: #fff;
    font-family: 'JetBrainsMono', monospace;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;

    code {
      color: inherit;
      padding: 0;
      background: none;
      font-size: 0.8rem;
    }
  }

  mark {
    background-color: #faf594;
  }

  img {
    max-width: 100%;
    height: auto;
  }

  blockquote {
    padding-left: 1rem;
    border-left: 2px solid rgba(#0d0d0d, 0.1);
  }

  hr {
    border: none;
    border-top: 2px solid rgba(#0d0d0d, 0.1);
    margin: 1rem 0;
  }

  ul[data-type='taskList'] {
    list-style: none;
    padding: 0;

    li {
      display: flex;
      align-items: center;

      > label {
        flex: 0 0 auto;
        margin-right: 0.5rem;
      }
    }
  }
}
</style>
