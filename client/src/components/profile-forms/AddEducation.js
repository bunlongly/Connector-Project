import React, { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Correct import for useNavigate
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';

const AddEducation = ({ addEducation }) => {
  const navigate = useNavigate(); // useNavigate should be called directly, not passed as a prop
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false, // should be boolean not string 'false'
    description: ''
  });

  const [toDataDisabled, toggleDisabled] = useState(true); // Default should reflect initial logic; possibly true if current is initially false

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleCheckboxChange = e => {
    const isCurrent = e.target.checked;
    setFormData({ ...formData, current: isCurrent });
    toggleDisabled(!toDataDisabled); // Disable 'to' date input if 'current' is checked
  };

  return (
    <Fragment>
      <section className='container'>
        <h1 className='large text-primary'>Add Your Education</h1>
        <p className='lead'>
          <i className='fas fa-code-branch'></i> Add any school or bootcamp that
          you have been attended
        </p>
        <small>* = required field</small>
        <form
          className='form'
          onSubmit={e => {
            e.preventDefault();
            addEducation(formData, navigate);
          }}
        >
          <div className='form-group'>
            <input
              type='text'
              placeholder='* School or Bootcamp'
              name='school'
              value={school}
              required
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='* Degree or Certificate'
              name='degree'
              value={degree}
              required
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              placeholder='Field of study'
              name='fieldofstudy'
              value={fieldofstudy}
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <h4>From Date</h4>
            <input type='date' name='from' value={from} onChange={onChange} />
          </div>
          <div className='form-group'>
            <p>
              <input
                type='checkbox'
                name='current'
                checked={current}
                onChange={handleCheckboxChange}
              />{' '}
              Current Job
            </p>
          </div>
          <div className='form-group'>
            <h4>To Date</h4>
            <input
              type='date'
              name='to'
              value={to}
              onChange={onChange}
              disabled={!toDataDisabled}
            />
          </div>
          <div className='form-group'>
            <textarea
              name='description'
              cols='30'
              rows='5'
              placeholder='Program Description'
              value={description}
              onChange={onChange}
            ></textarea>
          </div>
          <input type='submit' className='btn btn-primary my-1' />
          <Link className='btn btn-light my-1' to='/dashboard'>
            Go Back
          </Link>
        </form>
      </section>
    </Fragment>
  );
};

AddEducation.propTypes = {
  addExperience: PropTypes.func.isRequired
};

export default connect(null, { addEducation })(AddEducation);
