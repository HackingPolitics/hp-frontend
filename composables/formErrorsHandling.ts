import { Ref, ref } from '@nuxtjs/composition-api'
import { translateErrorMessage } from '~/utils/translateErrorMessage'

interface Violation {
  code: string
  message: string
  propertyPath: string
}

export default function () {
  const formErrors: Ref<string[]> = ref([])
  const inputErrors = ref({})

  const handleStatusErrors = (response: any) => {
    if (response?.response?.status)
      switch (response.response.status) {
        case 422:
          inputErrors.value = response.response.data.errors // assign field errors
          handleFormErrors(response)
          return
        case 401:
          inputErrors.value = response.response.data.errors // assign field errors
          handleFormErrors(response)
      }
  }

  const handleFormErrors = (response: any) => {
    if (response?.response?.data?.violations) {
      response.response.data.violations.forEach((violation: Violation) => {
        formErrors.value.push(translateErrorMessage(violation.message))
      })
    } else if (response?.response?.data?.message) {
      formErrors.value.push(
        translateErrorMessage(response.response.data.message)
      )
    }
  }

  return {
    formErrors,
    inputErrors,
    handleStatusErrors,
  }
}
