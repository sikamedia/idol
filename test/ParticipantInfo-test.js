import {shallow} from 'enzyme'
import {expect} from 'chai'
import {ParticipantInfo} from '../src/components/ParticipantDetails'
import React from 'react'

describe('ParticipantInfo Test',function(){

	it('should have props for name, imageUrl, and description', function () {
		const wrapper = shallow(<ParticipantInfo name='' imageUrl='' description=''/> );
		expect(wrapper.props().name).to.be.defined;
		expect(wrapper.props().imageUrl).to.be.defined;
		expect(wrapper.props().description).to.be.defined;
	});

	it('should have one ul',function(){
		const wrapper=shallow(<ParticipantInfo  name=''
												imageUrl=''
												description=''/>);
		expect(wrapper.find('ul')).to.have.length(1);
	});


});