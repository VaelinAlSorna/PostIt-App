import moment from 'moment';

const articles = [{
        comments: [{
            comment: 'Something to test?',
            _id: '1a',
            createdAt: moment(0).format('D.M.Y')
        }],
        createdAt: moment(0).format('D.M.Y'),
        _id: '1',
        likes: ['someId'],
        title: 'Breaking news',
        text: 'Political info'
    },{
        comments: [],
        createdAt: moment(0).subtract(4, 'days').format('D.M.Y'),
        _id: '2',
        likes: [],
        title: 'New graphene chips',
        text: 'Are going to conqver world'
    },{
        comments: [],
        createdAt: moment(0).add(4, 'days').format('D.M.Y'),
        _id: '3',
        likes: [],
        title: 'Hydrogen revolution?',
        text: 'Hydrogen powered ship is going to sail'
    }
];

export default articles;