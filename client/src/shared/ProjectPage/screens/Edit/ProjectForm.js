import React from 'react';
import PropTypes from 'prop-types';
import InputTags from '../../../components/Form/InputTags';
import InputCheckboxes from '../../../components/Form/InputCheckboxes';
import DatePicker from '../../../components/Form/DatePicker';
import FlashNotif from '../../../components/FlashNotif';
import TextAreaInput from '../../../components/Form/TextAreaInput';
import TextInput from '../../../components/Form/TextInput';
import { postToApiData } from '../../../../lib/helpers';
import { communitiesArr } from '../../../components/Collection/Communities/lib';
import { interests as availableInterests } from '../../../components/Collection/Interests/lib';

const deliverableFormats = require('../../../data/deliverableFormats.json');
const deliverableFormatsArr = Object.values(deliverableFormats);

export default class ProjectForm extends React.Component {
  constructor(props) {
    super(props);
    // Everything in the state is a formField
    this.state = {
      title: this.props.title,
      desc: this.props.desc,
      communities: this.props.selectedCommunities,
      interestAreas: this.props.selectedInterestAreas,
      creatorAbout: this.props.creator.about,
      creatorMission: this.props.creator.mission,
      contributors: [], // should be an array of ids. TODO: this needs to be sent to /api/notif. It's not used for anything now
      deliverableFormats: this.props.selectedDeliverableFormats,
      submissionInst: '',
      dueDate: '',
      flash: {
        state: 'ok',
        msg: ''
      }
    };
  }
  handleSubmit(postUrl, formFields) {
    const userId = this.props.user._id;
    const data = { formFields, userId };
    const cbFailure = (status, msg) => {
      this.setState({
        flash: { state: status, msg: msg }
      });
    }
    const cbSucess = (status, msg) => {
       // window.location = `/project/${msg}`;
      // TODO: Need to call redux action to update project state
      this.props.actionBtn.getProjectData(msg);
      this.props.history.push(`/project/${msg}`);
    }
    postToApiData(postUrl, data, cbFailure, cbSucess);
  }
  render() {
    return (
      <div className="col s12">
        <div className="card-panel white">
          <h5>About The Project</h5>
          <div className="row">
            <div className="col s12">
              <TextInput
                id="text-title"
                field={this.state.title}
                label="Title"
                onChange={d => this.setState({ title: d })}
              />
              <TextAreaInput
                id="text-desc"
                field={this.props.desc}
                label="Description"
                onChange={d => this.setState({ desc: d })}
              />
              <InputCheckboxes
                id="select-communities"
                itemWidthStyle="col s12 m4 l6"
                title={'What type of project?'}
                choices={communitiesArr}
                selected={this.state.communities}
                onChange={ds => this.setState({
                  communities: ds
                })}
              />
              <InputTags
                id="select-areas"
                label="Interest Areas"
                hint="+Interest"
                tags={availableInterests}
                selectedTags={this.state.interestAreas}
                onChange={ds => this.setState({ interestAreas: ds })}
              />
            </div>
          </div>
        </div>
        <div className="card-panel white">
          <h5>About You And Your Mission</h5>
          <p style={{ opacity: '0.8' }}>Introduce yourself. Give people a reason to get really excited about working on this project with you.</p>
          <div className="row">
            <div className="col s12">
              <TextAreaInput
                id="text-about-me"
                field={this.state.creatorAbout}
                label="About Me"
                onChange={d => this.setState({ creatorAbout: d })}
              />
              <TextAreaInput
                id="text-mission"
                field={this.state.creatorMission}
                label="My Mission"
                onChange={d => this.setState({ creatorMission: d })}
              />
            </div>
          </div>
        </div>
        {
          // <div className="card-panel white">
          //   <h5>Invite Project Contributors</h5>
          //   <p style={{ opacity: '0.8' }}>Invite people you know or want to collaborate with to contribute to the project.</p>
          //   <InputTags
          //     id="select-people"
          //     label="contributors"
          //     hint="+contributor"
          //     tags={this.props.people}
          //     selectedTags={this.state.contributors}
          //     onChange={ds => this.setState({ contributors: ds })}
          //   />
          // </div>
        }
        <div className="card-panel white">
          <h5>Deliverable</h5>
          <div className="row">
            <div className="col s12">
              <InputCheckboxes
                id="select-deliverable-formats"
                itemWidthStyle="col s12 m4 l6"
                title={'How to submit deliverable?'}
                choices={deliverableFormatsArr}
                selected={this.state.deliverableFormats}
                onChange={ds => this.setState({
                  deliverableFormats: ds
                })}
                showHelp
              />
              <TextAreaInput
                id="text-desc"
                field={this.state.submissionInst}
                label="Optional Submission Instruction"
                onChange={d => this.setState({ submissionInst: d })}
              />
            </div>
          </div>
          <p>Set a need date. You can change the need date anytime.</p>
          <div className="row">
            <div className="col s12 m10 l8">
              <DatePicker onChange={d => this.setState({ dueDate: d })} />
            </div>
          </div>
        </div>
        <div className="row center" style={{paddingBottom: 60}}>
          <a className="btn" onClick={this.handleSubmit.bind(this, this.props.actionBtn.postUrl, this.state)}>
            {this.props.actionBtn.label}
          </a>
        </div>
        <FlashNotif state={this.state.flash.state} msg={this.state.flash.msg} />
      </div>
    );
  }
}
ProjectForm.propTypes = {
  people: PropTypes.object,
  communities: PropTypes.array,
  selectedCommunities: PropTypes.array,
  selectedInterestAreas: PropTypes.array,
  title: PropTypes.string,
  desc: PropTypes.string
}
ProjectForm.defaultProps = {
  people: {name: {picture: '', id: ''}},
  communities: [],
  selectedCommunities: [],
  selectedInterestAreas: [],
  title: '',
  desc: ''
}
