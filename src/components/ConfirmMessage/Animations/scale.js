export default function scale(position) {
  return {
    msgContent: {
      transform: 'scale(0)',
      transition: 'transform 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
    },
    activeMsgContent: { transform: 'scale(1)' },
    deactiveMsgContent: {
      transform: 'scale(0)',
      transition: 'transform 150ms cubic-bezier(0.01, -0.01, 1, -0.42)',
    },
  }
}
