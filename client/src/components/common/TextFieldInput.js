import React from 'react';
import PropTypes from 'prop-types';

const TextFieldInput = ({name,placeholder,value,label,error,info,type,onChange,disabled}) => {
    return (
        <div className="form-group">
        <input disabled={disabled} onChange={(val) => onChange(val)} value={value} type={type} className={error ? "form-control border-danger form-control-lg" : "form-control form-control-lg"} placeholder={placeholder} name={name} />
        {error ? <small className="form-text text-danger">{error}</small> :<small className="form-text text-muted">{info}</small>}
      </div>
    )
}

TextFieldInput.propTypes = {
    name:PropTypes.string.isRequired,
    placeholder:PropTypes.string,
    value:PropTypes.string.isRequired,
    type:PropTypes.string.isRequired,
    info:PropTypes.string,
    error:PropTypes.string,
    onchange:PropTypes.func,
    disabled:PropTypes.string,
}

TextFieldInput.defaultProps = {
    type:"text",
    value:""
}

export default TextFieldInput
