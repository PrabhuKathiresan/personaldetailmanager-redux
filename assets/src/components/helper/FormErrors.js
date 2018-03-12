import React from 'react';

class FormErrors extends React.Component {
  render() {
    return (
        <div className="formErrors">
            {Object.keys(this.props.formErrors).map((fieldName, i) => {
                if (this.props.formErrors[fieldName].length > 0) {
                    return (
                        <span key={i}>{fieldName} {this.props.formErrors[fieldName]}</span>
                    );
                }
                return '';
            })}
        </div>
    );
  }
}

export default FormErrors;