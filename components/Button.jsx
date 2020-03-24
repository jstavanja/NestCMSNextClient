export default ({ type, text, onClick }) => {
  return (
    <>
      <button type={type} onClick={onClick}>
        {text}
      </button>
      <style jsx>
        {`
          button {
            font-size: 1.25rem;
            cursor: pointer;
            box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            color: white;
            background-color: #2cc2a3;
            padding: 5px 40px;
            transform: scale(1);
            transition: all 0.05s ease-in;
          }

          button:focus {
            outline: none;
            box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.5);
          }

          button:hover {
            transform: scale(1.05);
          }

          button:active {
            transform: scale(1.1);
          }
        `}
      </style>
    </>
  )
}
