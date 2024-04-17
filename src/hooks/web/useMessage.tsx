import type { ModalFunc, ModalFuncProps } from 'ant-design-vue/lib/modal/Modal'
import { Modal, message as Message } from 'ant-design-vue'
import { InfoCircleFilled, CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons-vue'
import { isString } from '@/utils/is'
import { i18n } from '@/locales'

const { t } = i18n.global

export interface ModalOptionsEx extends Omit<ModalFuncProps, 'iconType'> {
  iconType: 'success' | 'info' | 'warning' | 'error'
}

interface ConfirmOptions {
  success: ModalFunc
  info: ModalFunc
  warning: ModalFunc
  error: ModalFunc
}

function getIcon(iconType: string) {
  if (iconType === 'warning') {
    return <InfoCircleFilled class='modal-icon-warning' />
  } else if (iconType === 'success') {
    return <CheckCircleFilled class='modal-icon-success' />
  } else if (iconType === 'info') {
    return <InfoCircleFilled class='modal-icon-info' />
  } else {
    return <CloseCircleFilled class='modal-icon-error' />
  }
}

function renderContent({ content }: Pick<ModalOptionsEx, 'content'>) {
  if (isString(content)) {
    return <div innerHTML={`<div>${content as string}</div>`}></div>
  } else {
    return content
  }
}

// Create confirmation box
function createConfirm(options: ModalOptionsEx): ConfirmOptions {
  const iconType = options.iconType || 'warning'
  Reflect.deleteProperty(options, 'iconType')

  const opt: ModalFuncProps = {
    centered: true,
    icon: getIcon(iconType),
    content: renderContent(options),
    okText: `${t('system.modal.okText')}`,
    cancelText: `${t('system.modal.cancelText')}`,
    ...options
  }

  return Modal.confirm(opt) as unknown as ConfirmOptions
}

export function useMessage() {
  return {
    createMessage: Message,
    createConfirm
  }
}
