export default function belowOfFormFade() {
  return {
    msgContainer: {
      opacity: 0,
      transition: 'opacity 0.4s',
    },
    activeMsgContainer: { opacity: 1 },
    deactiveMsgContainer: {
      opacity: 0,
      transition: 'opacity 0.4s, visibility 0s ease-out 0.4s',
    },
  }
}
