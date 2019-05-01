// Core
import React from 'react';
import {mount} from 'enzyme';
import {Composer} from './';

const props = {
    _createPost: jest.fn(),
    avatar: '/images/abc.123.png',
    currentUserFirstName: 'Lisa',
    currentUserLastName: 'Simpson'
};
const comment = 'Happy Easter!';
const initialState = {
    comment: ''
};
const updatedState = {
    comment
};

const result = mount(<Composer {...props} />);

const _updateCommentSpy = jest.spyOn(result.instance(), '_updateComment');
const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _submitOnEnterSpy = jest.spyOn(result.instance(), '_submitOnEnter');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');


describe('Composer component:', () => {
    test('should have 1 "section" element', () => {
        expect(result.find('section')).toHaveLength(1);
        expect(result.find('section').hasClass('composer')).toBe(true);
    });
    test('should have 1 "form" element', () => {
        expect(result.find('form')).toHaveLength(1);
    });
    test('should have 1 "textarea" element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });
    test('should have 1 "input" element', () => {
        expect(result.find('input')).toHaveLength(1);
    });
    test('should have 1 "img" element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('should have valid props passed', () => {
        expect(result.prop('avatar')).toEqual('/images/abc.123.png');
        expect(result.prop('currentUserLastName')).toEqual('Simpson');
        expect(result.prop('currentUserFirstName')).toEqual('Lisa');
    });

    test('should have proper initial state', () => {
        expect(result.state()).toEqual(initialState);
    });
    test('should have empty textarea prop in initial state', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('should respond to state change properly', () => {
        result.setState({
            comment
        });
        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe('Happy Easter!');

        result.setState({
            comment: ''
        });
        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle textarea change event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment
            }
        });
        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);
        expect(_updateCommentSpy).toHaveBeenCalled();
    });

    test('should handle form submit event', () => {
        result.find('form').simulate('submit');

        expect(result.state()).toEqual(initialState);
    });

    test('_createPost should be invoked once on form submission', () => {
        // expect(props._createPost.mock.calls.length).toBe(1);
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and _handleFormSubmit should be invoked once on form submission', () => {
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });

    test('should handle empty textarea submit event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: ''
            }
        });
        result.find('form').simulate('submit');

        expect(_updateCommentSpy).toHaveBeenCalled();
        expect(_submitCommentSpy()).toBe(null);
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test('should handle on Enter submit event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment
            }
        });

        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);
        expect(_updateCommentSpy).toHaveBeenCalled();

        result.find('textarea').simulate('keypress', {
            keyCode: 13
        });

        expect(_submitOnEnterSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalled();
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(2);
    });

});
