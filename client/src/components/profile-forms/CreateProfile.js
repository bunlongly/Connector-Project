import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { createProfile, getCurrentProfile } from '../../actions/profile';
import { useNavigate, Link } from 'react-router-dom';

const initialState = {
  company: '',
  website: '',
  location: '',
  status: '',
  skills: '',
  githubusername: '',
  bio: '',
  twitter: '',
  facebook: '',
  linkedin: '',
  youtube: '',
  instagram: ''
};

const CreateProfile = ({ createProfile, getCurrentProfile, profile: { profile, loading } }) => {
  const [formData, setFormData] = useState(initialState);
  const [displaySocialInputs, setDisplaySocialInputs] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!profile) getCurrentProfile();
    if (!loading && profile) {
      setFormData({
        company: profile.company || '',
        website: profile.website || '',
        location: profile.location || '',
        status: profile.status || '',
        skills: profile.skills.join(', ') || '',
        githubusername: profile.githubusername || '',
        bio: profile.bio || '',
        twitter: profile.social?.twitter || '',
        facebook: profile.social?.facebook || '',
        linkedin: profile.social?.linkedin || '',
        youtube: profile.social?.youtube || '',
        instagram: profile.social?.instagram || ''
      });
    }
  }, [loading, getCurrentProfile, profile]);

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    // Check if editing or creating new profile based on the presence of profile data
    createProfile(formData, navigate, !!profile);
  };

  return (
    <section className="container">
      <h1 className="large text-primary">{profile ? 'Edit Your Profile' : 'Create Your Profile'}</h1>
      <p className="lead">
        <i className="fas fa-user"></i> {profile ? 'Make some changes to your profile' : "Let's get some information to make your profile stand out"}
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={onSubmit}>
        <div className="form-group">
          <select name="status" value={formData.status} onChange={onChange}>
            <option value="0">* Select Professional Status</option>
            <option value="Developer">Developer</option>
            <option value="Junior Developer">Junior Developer</option>
            <option value="Senior Developer">Senior Developer</option>
            <option value="Manager">Manager</option>
            <option value="Student or Learning">Student or Learning</option>
            <option value="Instructor">Instructor or Teacher</option>
            <option value="Intern">Intern</option>
            <option value="Other">Other</option>
          </select>
          <small className="form-text">Give us an idea of where you are at in your career</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Company" name="company" value={formData.company} onChange={onChange} />
          <small className="form-text">Could be your own company or one you work for</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Website" name="website" value={formData.website} onChange={onChange} />
          <small className="form-text">Could be your own or a company website</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Location" name="location" value={formData.location} onChange={onChange} />
          <small className="form-text">City & state suggested (eg. Boston, MA)</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="* Skills" name="skills" value={formData.skills} onChange={onChange} />
          <small className="form-text">Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</small>
        </div>
        <div className="form-group">
          <input type="text" placeholder="Github Username" name="githubusername" value={formData.githubusername} onChange={onChange} />
          <small className="form-text">If you want your latest repos and a Github link, include your username</small>
        </div>
        <div className="form-group">
          <textarea placeholder="A short bio of yourself" name="bio" value={formData.bio} onChange={onChange} />
          <small className="form-text">Tell us a little about yourself</small>
        </div>

        <div className="my-2">
          <button onClick={() => setDisplaySocialInputs(!displaySocialInputs)} type="button" className="btn btn-light">
            Add Social Network Links
          </button>
          <span>Optional</span>
        </div>

        {displaySocialInputs && (
          <Fragment>
            <div className="form-group social-input">
              <i className="fab fa-twitter fa-2x" />
              <input type="text" placeholder="Twitter URL" name="twitter" value={formData.twitter} onChange={onChange} />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-facebook fa-2x" />
              <input type="text" placeholder="Facebook URL" name="facebook" value={formData.facebook} onChange={onChange} />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-youtube fa-2x" />
              <input type="text" placeholder="YouTube URL" name="youtube" value={formData.youtube} onChange={onChange} />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-linkedin fa-2x" />
              <input type="text" placeholder="Linkedin URL" name="linkedin" value={formData.linkedin} onChange={onChange} />
            </div>
            <div className="form-group social-input">
              <i className="fab fa-instagram fa-2x" />
              <input type="text" placeholder="Instagram URL" name="instagram" value={formData.instagram} onChange={onChange} />
            </div>
          </Fragment>
        )}

        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn btn-light my-1" to="/dashboard">Go Back</Link>
      </form>
    </section>
  );
};

const mapStateToProps = state => ({
  profile: state.profile
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(CreateProfile);
