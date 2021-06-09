import PropTypes from "prop-types";

// Styles
import "./styles.scss";

const ImagePicker = (props) => {
  const { onChange, style } = props;

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

// Props

ImagePicker.propTypes = {
  onChange: PropTypes.func,
  style: PropTypes.object,
};

export default ImagePicker;
