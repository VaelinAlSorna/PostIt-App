import React from 'react';
import { shallow } from 'enzyme';
import { EditArticle } from '../../components/EditArticle';
import articles from '../fixtures/articlesFixtures';
import user from '../fixtures/usersFixtures';

let wrapper, startEditArticle, startRemoveArticle, history;

beforeEach(() => {
    startEditArticle = jest.fn(() => { return Promise.resolve(); });
    startRemoveArticle = jest.fn(() => { return Promise.resolve(); });
    history = { push: jest.fn() };
    wrapper = shallow(<EditArticle 
                                article={articles[0]}
                                startEditArticle={startEditArticle}
                                userId={user.id}
                                history={history}
                                startRemoveArticle={startRemoveArticle}
                            />
                        );
});

test('should render EditArticle correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should handle startEditArticle', async () => {
    const editedArticle = {title: 'edited title', text: 'edited text', createdAt: '2.7.2018' }
    await wrapper.find('ArticleForm').prop('onSubmit')(editedArticle);
    expect(startEditArticle).toHaveBeenLastCalledWith(articles[0]._id, editedArticle);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle startRemoveArticle', async () => {
    wrapper.find('button').simulate('click');
    await expect(startRemoveArticle).toHaveBeenLastCalledWith(articles[0]._id);
    expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should render error when article does note exist', () => {
    wrapper = shallow(<EditArticle 
            article={undefined}
            startEditArticle={startEditArticle}
            history={history}
            startRemoveArticle={startRemoveArticle}
            userId={user.id}
        />
    );
    expect(wrapper).toMatchSnapshot();
});

//articles[2] has diffrent id from user 
test('should render error when articleId does not match with userId', () => {
    wrapper = shallow(<EditArticle 
        article={articles[2]}
        startEditArticle={startEditArticle}
        history={history}
        startRemoveArticle={startRemoveArticle}
        userId={user.id}
    />
);
expect(wrapper).toMatchSnapshot();
});