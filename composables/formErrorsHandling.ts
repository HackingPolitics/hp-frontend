import { Ref, ref } from '@nuxtjs/composition-api'

export default function () {
  const formErrors: Ref<string[]> = ref([])
  const inputErrors = ref({})

  const handleStatusErrors = (response: any) => {
    if (response && response.response && response.response.status)
      switch (response.response.status) {
        case 422:
          inputErrors.value = response.response.data.errors // assign field errors
          formErrors.value.push(response.response.data.message || response.response.data['hydra:description'])
          return
        case 401:
          if (response.response.data.message === 'Invalid credentials') {
            formErrors.value = ['Logindaten überprüfen']
            return
          }
          inputErrors.value = response.response.data.errors // assign field errors
          formErrors.value.push(response.response.data.message)
      }
  }

  return {
    formErrors,
    inputErrors,
    handleStatusErrors,
  }
}
