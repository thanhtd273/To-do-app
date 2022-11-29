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
        deadline: new Date('2022-11-23T23:59'),
        isCompleted: false,
      },
      {
        title: 'Do general economic exercise',
        deadline: new Date('2022-11-24T23:59'),
        isCompleted: false,
      },
      {
        title: 'Finish physic exercise',
        deadline: new Date('2022-11-23T23:59'),
        isCompleted: false,
      },
      {
        title: 'Summit speaking test',
        deadline: new Date('2022-11-30T23:59'),
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
        deadline: new Date('2022-11-25T23:59'),
        isCompleted: false,
      },
      {
        title: 'Play basketball',
        deadline: new Date('2022-11-27T23:59'),
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
        deadline: new Date('2022-12-01T23:59'),
        isCompleted: false,
      },
      {
        title: 'Go to movie theatre with girlfriend',
        deadline: new Date('2022-11-26T23:59'),
        isCompleted: false,
      },
      {
        title: 'Go swimming with friends after exam',
        deadline: new Date('2022-11-27T23:59'),
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
        deadline: new Date('2022-11-28T23:59'),
        isCompleted: false,
      },
      {
        tile: 'Wash-up the towels and bag',
        deadline: new Date('2022-11-28T23:59'),
        isCompleted: false,
      },
    ],
  },
];

const DATA = [
  new Subject(1, 'Work', 'monitor', '#34fc7a', [
    new Task('w1', 'Continue to-do-app', new Date('2022-11-30T22:30'), false, [
      new Date('2022-16-30T22:30'),
    ]),
    new Task(
      'w2',
      'Install authetication for app',
      new Date('2023-01-15T10:30'),
      false,
      [new Date('2023-02-15T10:30')],
    ),
    new Task(
      'w3',
      'Implement new task screen',
      new Date('2022-12-01T12:00'),
      false,
      [new Date('2022-12-15T12:00')],
    ),
    new Task(
      'w4',
      'Design DATA for application',
      new Date('2022-11-22T22:30'),
      false,
      [new Date('2022-12-22T22:30')],
    ),
    new Task(
      'w5',
      'Implement footer of application',
      new Date('2022-11-22T22:30'),
      false,
      [new Date('2022-12-22T22:30')],
    ),
    new Task(
      'w6',
      'Connect app to Realtime databse',
      new Date('2022-12-10T22:30'),
      false,
      [new Date('2022-12-25T22:30')],
    ),
  ]),
  new Subject(2, 'Study', 'school', '#fcaa46', [
    new Task(
      's1',
      'Do English exercise on Richmmond',
      new Date('2022-11-28T08:00'),
      false,
      [new Date('2022-12-28T08:00')],
    ),
    new Task(
      's2',
      'Digital and analog circuit laboratory',
      new Date('2022-11-27T12:00'),
      false,
      [new Date('2022-11-27T12:00')],
    ),
    new Task(
      's3',
      'Take part in civic activity',
      new Date('2022-11-28T13:00'),
      false,
      [new Date('2022-12-28T13:00')],
    ),
    new Task(
      's4',
      'Continue studying React Native - The pratice guide course',
      new Date('2022-11-23T21:00'),
      false,
      [new Date('2022-12-23T21:00')],
    ),
    new Task(
      's5',
      'Pratice English pronuciation',
      new Date('2022-11-23T07:15'),
      false,
      [new Date('2022-12-23T07:15')],
    ),
    new Task(
      's6',
      'Learn English vocabulary and grammar',
      new Date('2022-11-23T07:15'),
      false,
      [new Date('2022-12-23T07:15')],
    ),
  ]),
  new Subject(3, 'Sport', 'sports-football', '#6e83de', [
    new Task(
      'sp1',
      'Play basketball with friends',
      new Date('2022-11-22T17:00'),
      false,
      [new Date('2022-12-22T17:00')],
    ),
    new Task(
      'sp2',
      'Run around dormitary three times',
      new Date('2022-11-23T06:15'),
      false,
      new Date('2022-10-23T06:15'),
    ),
    new Task(
      'sp3',
      'Watch Argentina vs Saudi Arabia match',
      new Date('2022-11-22T17:00'),
      false,
      [new Date('2022-10-22T17:00')],
    ),
    new Task(
      'sp4',
      'Watch Germany vs Japan match',
      new Date('2022-11-23T20:00'),
      false,
      [new Date('2022-10-23T20:00')],
    ),
  ]),
  new Subject(4, 'Friend', 'people', '#cc9299', [
    new Task(
      'f1',
      'Have a date with crush Thao Phuong',
      new Date('2022-12-05T08:00'),
      false,
      [new Date('2022-11-05T08:00')],
    ),
    new Task(
      'f2',
      'Explore Saigon with friends by motorbike',
      new Date('2022-11-28T08:00'),
      false,
      [new Date('2022-10-28T08:00')],
    ),
    new Task('f3', 'Go swimming', new Date('2022-11-27T14:00'), false),
    new Task(
      'f4',
      'Chat with Thao Phuong regularer',
      new Date('2022-11-24T20:00'),
      false,
      [new Date('2022-10-24T20:00')],
    ),
    new Task(
      'f5',
      'Save money to hang out with Thao Phuong',
      new Date('2022-12-01T23:59'),
      false,
      [new Date('2022-11-01T23:59')],
    ),
    new Task(
      'f6',
      'Have dinner with Quang Trung',
      new Date('2022-11-22T18:00'),
      false,
      [new Date('2022-10-22T18:00')],
    ),
  ]),
  new Subject(5, 'Others', 'dynamic-feed', '#b9c3cb', [
    new Task(
      'o1',
      'Call video with My Lien',
      new Date('2022-11-22T18:45'),
      false,
      [new Date('2022-10-22T18:45')],
    ),
    new Task('o2', 'Clean the bedroom', new Date('2022-11-28T07:45'), false, [
      new Date('2022-10-28T07:45'),
    ]),
    new Task('o3', 'Washing clothers', new Date('2022-11-24T18:30'), false, [
      new Date('2022-11-24T18:30'),
    ]),
  ]),
];

const SUBJECTS = [
  {
    subject: 'Work',
    icon: 'monitor',
    iconColor: '#34fc7a',
  },
  {
    subject: 'Study',
    icon: 'monitor',
    iconColor: '#fcaa46',
  },
  {
    subject: 'Sport',
    icon: 'sports-football',
    iconColor: '#6e83de',
  },
  {
    subject: 'Friend',
    icon: 'people',
    iconColor: '#cc9299',
  },
  {
    subject: 'Others',
    icon: 'dynamic-feed',
    iconColor: '#b9c3cb',
  },
];

export {TEMPLATE, DATA, SUBJECTS};
