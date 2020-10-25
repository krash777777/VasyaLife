import Images from './db_img.jsx';

const npc = {
    mom:{
        id:'mom',
        name:'Мама',
        ico:Images.npc.mom.ico_mom_present,
        discription:'Моя мама ... что еще нужно?',
        moodOptions:[
            {relationsMin:-30,relationsMax:-20,mood:'rage', text:['#&$& ... (похоже, мне лучше уйти)']},
            {relationsMin:-20,relationsMax:-10,mood:'annoyed', text:['Я не хочу с тобой разговаривать, оставь меня пожалуйста, ...']},
            {relationsMin:-10,relationsMax:0,mood:'sad', text:['У меня нет настроения ... что ты хочешь?']},
            {relationsMin:0,relationsMax:10,mood:'norm', text:['Как дела?']},
            {relationsMin:10,relationsMax:20,mood:'goodMood', text:['Чудесно выглядишь! Что нового?']},
            {relationsMin:20,relationsMax:31,mood:'joy', text:['У меня исключтельно хорошее настроение!']},
        ]
    },
    principal:{
        id:'principal',
        ico:Images.npc.principal.ico_principal_present,
        name:'Директор колледжа',
        discription:'',
        moodOptions:[
            {relationsMin:-30,relationsMax:-10,mood:'rage', text:['#&$& ... (похоже, мне лучше уйти)']},
            {relationsMin:-10,relationsMax:0,mood:'sad', text:['?!']},
            {relationsMin:0,relationsMax:10,mood:'norm', text:['Привет ...']},
            {relationsMin:10,relationsMax:31,mood:'joy', text:['Привет! Хорошо выглядишь!']},
        ]
    },
    librarian:{
        id:'librarian',
        ico:Images.npc.librarian.bkueSkirt.external1,
        name:'Библиотекарь',
        discription:'Подрабатывает библиотекарем ...',
        moodOptions:[
            {relationsMin:-30,relationsMax:-10,mood:'rage', text:['#&$& ... (похоже, мне лучше уйти)']},
            {relationsMin:-10,relationsMax:0,mood:'sad', text:['?!']},
            {relationsMin:0,relationsMax:10,mood:'norm', text:['Привет ...']},
            {relationsMin:10,relationsMax:31,mood:'joy', text:['Привет! Хорошо выглядишь!']},
        ]
    },
    nurse:{
        id:'nurse',
        ico:Images.npc.nurse.jeansShorts.external1,
        name:'Медсестра',
        discription:'Местная медсестра ...',
        moodOptions:[
            {relationsMin:-30,relationsMax:-10,mood:'rage', text:['#&$& ... (похоже, мне лучше уйти)']},
            {relationsMin:-10,relationsMax:0,mood:'sad', text:['?!']},
            {relationsMin:0,relationsMax:10,mood:'norm', text:['Привет ...']},
            {relationsMin:10,relationsMax:31,mood:'joy', text:['Привет! Хорошо выглядишь!']},
        ]
    }
};

export default npc;