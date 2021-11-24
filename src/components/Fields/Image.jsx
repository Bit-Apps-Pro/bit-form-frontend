function Image({ fieldKey, attr }) {
  return (
    <>
      <div className="drag">
        <div className={`${fieldKey}-wrp`}>
          <img src={attr?.bg_img || 'https://www.newhopelanding.com/app/uploads/2019/11/1024.png'} height="100%" width="100%" alt="bg" />
        </div>
      </div>
    </>
  )
}

export default Image
