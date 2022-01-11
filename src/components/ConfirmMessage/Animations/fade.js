export default function fade(position) {
  return {
    msgContent: {
      opacity: 0,
      transition: 'opacity 0.4s',
    },
    activeMsgContent: { opacity: 1 },
    deactiveMsgContent: { opacity: 0 },
  }
}
