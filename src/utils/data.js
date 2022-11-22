import Subject from '../models/Subject';
import Task from '../models/Task';

const TEMPLATE = [
  {
    id: 1,
    subject: 'Work',
    icon: 'monitor',
    iconColor: '#34fc7a',
    tasks: [
      {
        title: 'Continue to-do-list',
        deadline: new Date('2022-10-19T05:10'),
        isCompleted: false,
      },
      {
        title: 'Continue to-do-list',
        deadline: new Date('2022-10-19T05:10'),
        isCompleted: false,
      },
      {
        title: 'Continue to-do-list',
        deadline: new Date('2022-10-19T05:10'),
        isCompleted: false,
      },
      {
        title: 'Connect database to app',
        deadline: new Date('2022-10-20T23:00'),
        isCompleted: false,
      },
      {
        title: 'Implement authentication to login user',
        deadline: new Date('2022-12-15T22:00'),
      },
      {
        title: 'Complete analog circuit project',
        deadline: new Date('2022-11-20T23:59'),
        isCompleted: false,
      },
      {
        title: 'Complete analog circuit project',
        deadline: new Date('2022-11-20T23:59'),
        isCompleted: false,
      },
      {
        title: 'Do general economic exercise',
        deadline: new Date('2022-10-30T05:30'),
        isCompleted: false,
      },
      {
        title: 'Finish physic exercise',
        deadline: new Date('2022-11-19T12:00'),
        isCompleted: false,
      },
      {
        title: 'Summit speaking test',
        deadline: new Date('2022-11-12T21:30'),
        isCompleted: false,
      },
    ],
  },
  {
    id: 2,
    subject: 'Study',
    icon: 'monitor',
    iconColor: '#fcaa46',
    tasks: [
      {
        title: 'Complete analog circuit project',
        deadline: '23:59:00, 23/11/2022',
        isCompleted: false,
      },
      {
        title: 'Do general economic exercise',
        deadline: '05:30:00, 30/10/2022',
        isCompleted: false,
      },
      {
        title: 'Finish physic exercise',
        deadline: '10:00:00, 31/10/2022',
        isCompleted: false,
      },
      {
        title: 'Summit speaking test',
        deadline: '15:25:00, 25/10/2022',
        isCompleted: false,
      },
    ],
  },
  {
    id: 3,
    subject: 'Sport',
    icon: 'sports-football',
    iconColor: '#6e83de',
    tasks: [
      {
        title: 'Play football',
        deadline: '17:00:00, 21/10/2022',
        isCompleted: false,
      },
      {
        title: 'Play basketball',
        deadline: '17:30:00, 21/10/2022',
        isCompleted: false,
      },
    ],
  },
  {
    id: 4,
    subject: 'Friend',
    icon: 'people',
    iconColor: '#cc9299',
    tasks: [
      {
        title: 'Have a coffee with my bestfriends',
        deadline: '20:00:00, 6/11/2022',
        isCompleted: false,
      },
      {
        title: 'Go to movie theatre with girlfriend',
        deadline: '15:00:2022, 6/11/2022',
        isCompleted: false,
      },
      {
        title: 'Go swimming with friends after exam',
        deadline: '15:00:00, 5/11/2022',
        isCompleted: false,
      },
    ],
  },
  {
    id: 5,
    subject: 'Others',
    icon: 'dynamic-feed',
    iconColor: '#b9c3cb',
    tasks: [
      {
        title: 'Clean my bed',
        deadline: '7:30:00, 28/10/2022',
        isCompleted: false,
      },
      {
        tile: 'Wash-up the towels and bag',
        deadline: '7:30:00, 6/11/2022',
        isCompleted: false,
      },
    ],
  },
];

const DATA = [
  new Subject(1, 'Work', 'monitor', '#34fc7a', [
    new Task('w1', 'Continue to-do-app', '2022-11-30T22:30', false),
    new Task('w2', 'Install authetication for app', '2023-01-15T10:30', false),
    new Task('w3', 'Implement new task screen', '2022-12-01T12:00', false),
    new Task('w4', 'Design DATA for application', '2022-11-22T22:30', false),
    new Task(
      'w5',
      'Implement footer of application',
      '2022-11-22T22:30',
      false,
    ),
    new Task(
      'w6',
      'Connect app to Realtime databse',
      '2022-12-10T22:30',
      false,
    ),
  ]),
  new Subject(2, 'Study', 'school', '#fcaa46', [
    new Task(
      's1',
      'Do English exercise on Richmmond',
      '2022-11-28T08:00',
      false,
    ),
    new Task(
      's2',
      'Digital and analog circuit laboratory',
      '2022-11-27T12:00',
      false,
    ),
    new Task('s3', 'Take part in civic activity', '2022-11-28T13:00', false),
    new Task(
      's4',
      'Continue studying React Native - The pratice guide course',
      '2022-11-23T21:00',
      false,
    ),
    new Task('s5', 'Pratice English pronuciation', '2022-11-23T7:15', false),
    new Task(
      's6',
      'Learn English vocabulary and grammar',
      '2022-11-23T7:15',
      false,
    ),
  ]),
  new Subject(3, 'Sport', 'sports-football', '#6e83de', [
    new Task('sp1', 'Play basketball with friends', '2022-11-22T17', false),
    new Task(
      'sp2',
      'Run around dormitary three times',
      '2022-11-23T06:15',
      false,
    ),
    new Task(
      'sp3',
      'Watch Argentina vs Saudi Arabia match',
      '2022-11-22T17',
      false,
    ),
    new Task('sp4', 'Watch Germany vs Japan match', '2022-11-23T20', false),
  ]),
  new Subject(4, 'Friend', 'people', '#cc9299', [
    new Task(
      'f1',
      'Have a date with crush Thao Phuong',
      '2022-12-05T08',
      false,
    ),
    new Task(
      'f2',
      'Explore Saigon with friends by motorbike',
      '2022-11-18T08',
      false,
    ),
    new Task('f3', 'Go swimming', '2022-11-27T14', false),
    new Task('f4', 'Chat with Thao Phuong regularer', '2022-11-24T20', false),
    new Task(
      'f5',
      'Save money to hang out with Thao Phuong',
      '2022-12-01T23:59',
      false,
    ),
    new Task('f6', 'Have dinner with Quang Trung', '2022-11-22T18', false),
  ]),
  new Subject(5, 'Others', 'dynamic-feed', '#b9c3cb', [
    new Task('o1', 'Call video with My Lien', '2022-11-22T18:45', false),
    new Task('o2', 'Clean the bedroom', '2022-11-28T07:45', false),
    new Task('o3', 'Washing clothers', '2022-11-24T18:30', false),
  ]),
];

export {TEMPLATE, DATA};
