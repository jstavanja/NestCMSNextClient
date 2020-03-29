export default ({ width = 50 }) => {
  return (
    <>
      <img src='/logo.svg'></img>
      <span>NestCMS</span>
      <style jsx global>{`
        img {
          width: ${width}px;
        }
        span {
          margin-left: 10px;
          font-size: ${width / 2}px;
        }
      `}</style>
    </>
  )
}
