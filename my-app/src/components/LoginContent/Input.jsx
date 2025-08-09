export default function Input({ label, id, error, ...props }) {
  return (
    <>
      <div className="login-fields">
        <label htmlFor={id}>{label}</label>
        <input id={id} {...props} />
      </div>
      <div className="not-valid">{error && <p>{error}</p>}</div>
    </>
  );
}
