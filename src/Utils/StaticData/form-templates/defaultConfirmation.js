export const msgDefaultConfig = {
  msgType: 'modal',
  position: 'bottom-right',
  animation: 'fade',
  autoHide: false,
  duration: 1,
  styles: {
    width: '300px',
    padding: '5px 35px 5px 20px',
    background: 'var(--bg-0)',
    color: 'var(--global-font-color)',
    borderWidth: '1px',
    borderType: 'solid',
    borderColor: 'var(--bg-5)',
    borderRadius: 'var(--g-bdr-rad)',
    boxShadow: [
      {
        x: '0px',
        y: '27px',
        blur: '30px',
        spread: '',
        color: 'rgb(0 0 0 / 18%)',
        inset: '',
      },
      {
        x: '0px',
        y: '5.2px',
        blur: '9.4px',
        spread: '5px',
        color: 'rgb(0 0 0 / 6%)',
        inset: '',
      },
      {
        x: '0px',
        y: '11.1px',
        blur: '14px',
        spread: '',
        color: 'rgb(0 0 0 / 14%)',
        inset: '',
      },
    ],
    closeBackground: 'transparent',
    closeHover: 'var(--bg-10)',
    closeIconColor: 'var(--bg-40)',
    closeIconHover: 'var(--bg-50)',
  },
}

export function defaultConfirmations(formID) {
  const { msgType, position, animation, autoHide, duration, styles } = msgDefaultConfig

  return {
    type: {
      successMsg: [{
        title: 'Untitled Message 1',
        msg: '<p>Successfully Submitted.</p>',
        config: {
          msgType,
          position,
          animation,
          autoHide,
          duration,
          styles,
        },
      }],
      redirectPage: [{ title: 'Untitled Redirect Url 1', url: '' }],
      webHooks: [{ title: 'Untitled Webhook 1', url: '', method: 'GET' }],
    },
  }
}
