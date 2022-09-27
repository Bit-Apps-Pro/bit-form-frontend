export default function belowOfFormScale() {
  return {
    msgContainer: {
      transform: 'scale(0)',
      transition: 'transform 0.3s cubic-bezier(0, 0.93, 1, 1.12)',
    },
    activeMsgContainer: { transform: 'scale(1)' },
    deactiveMsgContainer: {
      transform: 'scale(0)',
      transition:
        'transform 150ms cubic-bezier(0.01, -0.01, 1, -0.42), visibility 0s ease-out 0.4s, opacity 0.4s',
    },
  }
}
