export const msgDefaultConfig = {
  msgType: 'below',
  position: 'bottom-right',
  animation: 'fade',
  autoHide: true,
  duration: 3,
  styles: {
    width: '300px',
    padding: '5px 35px 5px 20px',
    background: '#bdffd4e8',
    color: 'var(--global-font-color)',
    borderWidth: '1px',
    borderType: 'solid',
    borderColor: '#a9ffa3',
    borderRadius: 'var(--g-bdr-rad)',
    boxShadow: [
      {
        x: '0px',
        y: '0px',
        blur: '0px',
        spread: '0px',
        color: 'rgb(0 0 0 / 6%)',
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
        title: 'Form Success Message',
        msg: '<p style="text-align: center;"><span style="font-size: 12pt;"><strong>Successfully Submitted.&nbsp;</strong></span></p>',
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
