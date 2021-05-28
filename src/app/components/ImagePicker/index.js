// Styles
import "./styles.scss";

const ImagePicker = ({ onChange, style }) => {
  return (
    <form>
      <label htmlFor="file-upload" className="file-upload" style={style}>
        ADD IMAGE
      </label>
      <input
        id="file-upload"
        type="file"
        multiple
        onChange={(e) => onChange(e.target.files)}
      />
    </form>
  );
};

export default ImagePicker;
