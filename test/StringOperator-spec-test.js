import {StringOperator} from 'common/StringOperator'
import {participants} from './mock_data/mock'


describe('StringOperator', () => {

	it('should convert text string to array', ()=> {
		let stringOperator = new StringOperator();
		let resultArray = stringOperator.convertTextArray(participants[0].description);
		expect(resultArray[0]).to.equals('Född: 27:e Juni 2000.');
	});
});