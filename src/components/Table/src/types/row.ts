import type { Ref } from 'vue'

export type EditRecordRow<T = Recordable> = Partial<
  {
    onEdit: (editable: boolean, submit?: boolean) => Promise<boolean>
    onValid: () => Promise<boolean>
    editable: boolean
    onCancel: Fn
    onSubmit: Fn
    submitCbs: Fn[]
    cancelCbs: Fn[]
    validCbs: Fn[]
    editValueRefs: Recordable<Ref>
  } & T
>
