<template lang="pug">
  form(@submit.prevent="onSubmit")
    slot
</template>

<script>
import {useId} from '#imports'
import {useEventBus} from '@vueuse/core'

class FormException extends Error {
  constructor(message) {
    super(message)
    this.message = message
    Object.setPrototypeOf(this, FormException.prototype)
  }
}

export default defineComponent({
  name: "UiForm",
  props: {
    schema: {
      type: Object,
      default: undefined
    },
    state: {
      type: Object,
      required: true
    },
    validate: {
      type: Function,
      default: () => []
    },
    validateOn: {
      type: Array,
      default: () => ['blur', 'input', 'change', 'submit']
    }
  },
  emits: ['submit', 'error'],
  setup(props, {expose, emit}) {
    const formId = useId()
    const bus = useEventBus(`form-${formId}`)

    onMounted(() => {
      bus.on(async (event) => {
        if (event.type !== 'submit' && props.validateOn?.includes(event.type)) {
          await validate(event.path, {silent: true})
        }
      })
    })

    onUnmounted(() => {
      bus.reset()
    })

    const errors = ref([])
    provide('form-errors', errors)
    provide('form-events', bus)
    const inputs = ref({})

    async function getErrors() {
      let errs = await props.validate(props.state)

      if (props.schema) {
        errs = errs.concat(await getYupErrors(props.state, props.schema))
      }

      return errs
    }

    async function validate(path, opts = {silent: false}) {
      let paths = path

      if (path && !Array.isArray(path)) {
        paths = [path]
      }

      if (paths) {
        const otherErrors = errors.value.filter(
            (error) => !paths.includes(error.path)
        )
        const pathErrors = (await getErrors()).filter(
            (error) => paths.includes(error.path)
        )
        errors.value = otherErrors.concat(pathErrors)
      } else {
        errors.value = await getErrors()
      }

      if (errors.value.length > 0) {
        if (opts.silent) return false

        throw new FormException(
            `Form validation failed: ${JSON.stringify(errors.value, null, 2)}`
        )
      }

      return props.state
    }

    async function onSubmit(payload) {
      const event = payload;
      try {
        if (props.validateOn?.includes('submit')) {
          await validate()
        }
        const submitEvent = {
          ...event,
          data: props.state
        }
        emit('submit', submitEvent)
      } catch (error) {
        console.log(error);
        if (!(error instanceof FormException)) {
          throw error
        }

        const errorEvent = {
          ...event,
          errors: errors.value.map((err) => ({
            ...err,
            id: inputs.value[err.path]
          }))
        }
        console.log(errorEvent);
        emit('error', errorEvent)
      }
    }

    expose({
      validate,
      errors,
      setErrors(errs, path) {
        errors.value = errs
        if (path) {
          errors.value = errors.value.filter(
              (error) => error.path !== path
          ).concat(errs)
        } else {
          errors.value = errs
        }
      },
      async submit() {
        await onSubmit(new Event('submit'))
      },
      getErrors(path) {
        if (path) {
          return errors.value.filter((err) => err.path === path)
        }
        return errors.value
      },
      clear(path) {
        if (path) {
          errors.value = errors.value.filter((err) => err.path !== path)
        } else {
          errors.value = []
        }
      }
    })

    return {
      onSubmit
    }
  }
})

async function getYupErrors(state, schema) {
  try {
    await schema.validate(state, {abortEarly: false})
    return []
  } catch (error) {
    if (error.inner !== undefined) {
      return error.inner.map((issue) => ({
        path: issue.path ?? '',
        message: issue.message
      }))
    } else {
      throw error
    }
  }
}
</script>
