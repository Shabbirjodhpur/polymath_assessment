var one_second = 1000;

function generateQuestions(){
    let questions = []
    for(let i=2;i<=9;i++){
        questions.push({
             description:`add ${i}`,
             calculate:(n)=>(n+i)
        })
    }
    for(let i=2;i<=9;i++){
        questions.push({
             description:`subtract ${i}`,
             calculate:(n)=>(n-i)
        })
    }
    questions.push({
        description:`multiply 2`,
        calculate:(n)=>(n*2)
    })
    return questions
}

var words_arr = ['cat','dog','ball','pencil','paper','table','laptop','computer','wire','iron','nickel','gold','silver','phone','specs','evp','cfi','yoo','maths','science','commerce']
var questions_fourth_arr = generateQuestions();

document.getElementById('first-block').style.display='none';
document.getElementById('second-block').style.display='none';
document.getElementById('third-block').style.display='none';
document.getElementById('fourth-block').style.display='none';
document.getElementById('score-block').style.display='none';
document.getElementById('info-block').style.display='none';

document.getElementById('test-first-block').style.display='none';
document.getElementById('test-second-block').style.display='none';
document.getElementById('test-third-block').style.display='none';
document.getElementById('test-fourth-block').style.display='none';

document.getElementById('answer-first-block-wrapper').style.display='none';
document.getElementById('answer-second-block-wrapper').style.display='none';
document.getElementById('answer-third-block-wrapper').style.display='none';
document.getElementById('answer-fourth-block-wrapper').style.display='none';

document.getElementById('start-assessment').addEventListener('click',()=>{
	document.getElementById('intro-block').style.display='none';
	document.getElementById('first-block').style.display='block';
})

document.getElementById('start-first-assessment').addEventListener('click',()=>{
	document.getElementById('intro-first-block').style.display='none';
	document.getElementById('test-first-block').style.display='block';
	startFirstAssessment();
})

document.getElementById('start-second-assessment').addEventListener('click',()=>{
	document.getElementById('intro-second-block').style.display='none';
	document.getElementById('test-second-block').style.display='block';
	startSecondAssessment();
})

document.getElementById('start-third-assessment').addEventListener('click',()=>{
	document.getElementById('intro-third-block').style.display='none';
	document.getElementById('test-third-block').style.display='block';
	startThirdAssessment();
})

document.getElementById('start-fourth-assessment').addEventListener('click',()=>{
	document.getElementById('intro-fourth-block').style.display='none';
	document.getElementById('test-fourth-block').style.display='block';
	startFourthAssessment();
})

var first_test_answers = [];
var first_test_number_limit = 4;
var first_test_wrong_answers = 0;
var first_test_question = '';
var first_test_score = 0;
function startFirstAssessment(){
	first_test_question = ''
	document.getElementById('answer-first-block').value = '';
	for(let i=0;i<first_test_number_limit;i++){
		first_test_question += Math.floor(Math.random()*9);
	}
	document.getElementById('question-first-block').innerText = first_test_question;
	setTimeout(()=>{
		document.getElementById('question-first-block-wrapper').style.display='none';
		document.getElementById('answer-first-block-wrapper').style.display='block';
	},(first_test_number_limit-2)*one_second)
}

document.getElementById('answer-first-block-submit').addEventListener('click',()=>{
	let ans = document.getElementById('answer-first-block').value;
	if(ans==first_test_question && first_test_answers.length<10){
		console.log('h')
		first_test_number_limit++;
		first_test_answers.push(first_test_number_limit);
		first_test_wrong_answers = 0;
		startFirstAssessment()
	}else if(first_test_answers.length<10){
		console.log('hereee')	
		first_test_answers.push(first_test_number_limit);
		first_test_wrong_answers++;
		if(first_test_wrong_answers==3){
			close_first_test();
		}else{
			startFirstAssessment()	
		}
	}
	if(first_test_answers.length<10){
		document.getElementById('answer-first-block-wrapper').style.display='none';
		document.getElementById('question-first-block-number').innerText = first_test_answers.length + 1;
		document.getElementById('question-first-block-wrapper').style.display='block';	
	}else{
		close_first_test()
	}
})
function close_first_test(){
	document.getElementById('first-block').style.display ='none';
	document.getElementById('third-block').style.display='block';
	first_test_score = ((first_test_answers[first_test_answers.length-1]-4)*(25/10));
}

function shuffle(arr){
let array = [...arr]
    for(let k = array.length -1;k>0;k--){
        var p = Math.floor(Math.random()*(k+1));
        var temp = array[k];
        array[k] = array[p];
        array[p] = temp;
    }
return array;
}

var second_test_answers = [];
var second_test_word_limit = 10;
var second_test_wrong_answers = 0;
var second_test_question = [];
var second_test_score = 0;
var second_test_reversed = false;

function down_answer_list(){
    let current_node = event.target.parentNode;
    let next_node = current_node.nextSibling;
    let list = current_node.parentNode;
    if(next_node==null) return;
    list.insertBefore(next_node,current_node)
}

function up_answer_list(){
    let current_node = event.target.parentNode;
    let previous_node = current_node.previousSibling;
    let list = current_node.parentNode;
    if(previous_node==null) return;
    list.insertBefore(current_node,previous_node)
}


document.getElementById('i-am-ready').addEventListener('click',()=>{
	if(second_test_reversed==false){
		document.getElementById('question-reverse-or-not-second-block').innerHTML = 'Arrange the words as they appeared before.'
	}else{
		document.getElementById('question-reverse-or-not-second-block').innerHTML = 'Arrange the words in reverse order.'
	}
		document.getElementById('question-second-block-wrapper').style.display='none';
		document.getElementById('answer-second-block-wrapper').style.display='block';
		let randomize_question_words = shuffle(second_test_question);
		for(let i=0;i<randomize_question_words.length;i++){
			let word = randomize_question_words[i];

			var word_div = document.createElement('div');
			word_div.classList.add('option_word')

			var word_span = document.createElement('span');
			word_span.innerText = word;			

			var word_up = document.createElement('img');
			word_up.src='./up-arrow.png'
			word_up.onclick = up_answer_list;

			var word_down = document.createElement('img');
			word_down.src='./down-arrow.png'
			word_down.onclick = down_answer_list

			word_div.append(word_span,word_up,word_down)

			document.getElementById('answer-second-block').append(word_div)
		}
	})

function randomBool(){
	let ran = Math.random();
	if(ran<0.5) return true;
	return false;
}

function startSecondAssessment(){
	second_test_question = [];
	document.getElementById('answer-second-block').innerHTML = '';
	words_arr = shuffle(words_arr);
	for(let i=0;i<second_test_word_limit;i++){
		second_test_question.push(words_arr[i]);
	}
	second_test_reversed = randomBool();
	document.getElementById('question-reverse-or-not-second-block').innerHTML = '' 
	document.getElementById('question-second-block').innerHTML = second_test_question.join('<br>');
}

document.getElementById('answer-second-block-submit').addEventListener('click',()=>{
	let answers = document.getElementById('answer-second-block');
	let correctly_answered = true;
	if(second_test_reversed==false){
		for(let i=0;i<answers.childElementCount;i++){
			if(second_test_question[i] != answers.childNodes[i].childNodes[0].innerText){ 
				correctly_answered = false;
				break;
			}
		}
	}else{
		for(let i=0;i<answers.childElementCount;i++){
			if(second_test_question[answers.childElementCount-i-1] != answers.childNodes[i].childNodes[0].innerText){ 
				correctly_answered = false;
				break;
			}
		}	
	}


	
	if(correctly_answered && second_test_answers.length<3){
		second_test_word_limit+=5;
		second_test_answers.push(second_test_word_limit);
		second_test_wrong_answers = 0;
		startSecondAssessment()
	}else if(second_test_answers.length<3){
		console.log('hereee')	
		second_test_answers.push(second_test_word_limit);
		second_test_wrong_answers++;
		if(second_test_wrong_answers==3){
			close_second_test();
		}else{
			startSecondAssessment()	
		}
	}
	if(second_test_answers.length<3){
		document.getElementById('answer-second-block-wrapper').style.display='none';
		document.getElementById('question-second-block-number').innerText = second_test_answers.length + 1;
		document.getElementById('question-second-block-wrapper').style.display='block';	
	}else{
		close_second_test()
	}
})

function close_second_test(){
	document.getElementById('second-block').style.display ='none';
	second_test_score = (((second_test_answers[second_test_answers.length-1]/5)-2)*(25/3));

	document.getElementById('info-block').style.display='flex';
}
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
function infoIsNotValid(){
	let name = document.getElementById('info-name').value
	let email = document.getElementById('info-email').value
	let phone = document.getElementById('info-phone').value
	if(name==''){
		alert('name can not be empty')
		return true;
	}
	if(email==''){
		alert('email can not be empty')
		return true;
	}
	if(phone==''){
		alert('phone number can not be empty')
		return true;
	}
	if(phone.length<9){
		alert('phone number is invalid')
		return true;
	}
	if(!validateEmail(email)){
		alert('email is invalid')
		return true;
	}
	return false;
}
function submitDetails(){
	let name = document.getElementById('info-name').value
	let email = document.getElementById('info-email').value
	let phone = document.getElementById('info-phone').value
	let total_score = parseFloat(first_test_score.toFixed(2)) + parseFloat(second_test_score.toFixed(2)) + parseFloat(third_test_score.toFixed(2)) + parseFloat(fourth_test_score.toFixed(2));
	fetch(`https://polymath-server-gold.vercel.app/test?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&firstscore=${encodeURIComponent(first_test_score)}&secondscore=${encodeURIComponent(third_test_score)}&thirdscore=${encodeURIComponent(fourth_test_score)}&fourthscore=${encodeURIComponent(second_test_score)}&totalscore=${encodeURIComponent(total_score)}&phone=${encodeURIComponent(phone)}`, {
  		method: "GET",
	}).then(e=>{

		document.getElementById('info-block').style.display='none';
		document.getElementById('score-block').style.display='block';
		show_results();
       }).catch(e=>console.log(e))


}
document.getElementById('submit-details').addEventListener('click',()=>{
	if(infoIsNotValid()) return;
	submitDetails();
})


var third_test_answers = [];
var third_test_number_limit = 2;
var third_test_wrong_answers = 0;
var third_test_question = '';
var third_test_score = 0;
var n_back_answer = '';
var n_back_question = '';
function startThirdAssessment(){
	third_test_question = ''
	document.getElementById('answer-third-block').value = '';
	for(let i=0;i<third_test_number_limit;i++){
		third_test_question += Math.floor(Math.random()*9);
	}
	let third_test_question_pretty = ''
	for(let i=0;i<third_test_question.length;i++){
		third_test_question_pretty += third_test_question[i];
		if(i%2 == 1) third_test_question_pretty += ' ';
	}
	document.getElementById('question-third-block').innerText = third_test_question_pretty;
	setTimeout(()=>{
		document.getElementById('question-third-block-wrapper').style.display='none';
		document.getElementById('answer-third-block-wrapper').style.display='block';

		let w = Math.floor(Math.random()*(third_test_question.length-1));
		let q = third_test_question.length - w;
		n_back_question = `${q} number from right`;
		n_back_answer = third_test_question[w];

		document.getElementById('n-back-third-test-question').innerText = n_back_question;
	},(third_test_number_limit-1)*one_second)
}


document.getElementById('answer-third-block-submit').addEventListener('click',()=>{
	let ans = document.getElementById('answer-third-block').value;
	if(ans==n_back_answer && third_test_answers.length<7){
		console.log('h')
		third_test_number_limit+=2;
		third_test_answers.push(third_test_number_limit);
		third_test_wrong_answers = 0;
		startThirdAssessment()
	}else if(third_test_answers.length<7){
		console.log('hereee')	
		third_test_answers.push(third_test_number_limit);
		third_test_wrong_answers++;
		if(third_test_wrong_answers==3){
			close_third_test();
		}else{
			startThirdAssessment()	
		}
	}
	if(third_test_answers.length<7){
		document.getElementById('answer-third-block-wrapper').style.display='none';
		document.getElementById('question-third-block-number').innerText = third_test_answers.length + 1;
		document.getElementById('question-third-block-wrapper').style.display='block';	
	}else{
		close_third_test()
	}
})

function close_third_test(){
	document.getElementById('third-block').style.display ='none';
	document.getElementById('fourth-block').style.display='block';
	third_test_score = (((third_test_answers[third_test_answers.length-1]/2)-1)*(25/7));
}


var fourth_test_answers = [];
var fourth_test_number_limit = 1;
var fourth_test_wrong_answers = 0;
var fourth_test_question = [];
var fourth_test_score = 0;
var specific_question_obj_fourth={};

function startFourthAssessment(){
	fourth_test_question = [];
	document.getElementById('answer-fourth-block').innerHTML = '';
	for(let i=0;i<fourth_test_number_limit;i++){
		let first_digit = 1 + Math.floor(Math.random()*8);
		let second_digit = 1 + Math.floor(Math.random()*8);
		fourth_test_question.push(parseInt(first_digit+''+second_digit));
	}
	document.getElementById('question-fourth-block').innerText = fourth_test_question.join(' ');
	setTimeout(()=>{
		document.getElementById('question-fourth-block-wrapper').style.display='none';
		document.getElementById('answer-fourth-block-wrapper').style.display='block';
		specific_question_obj_fourth = questions_fourth_arr[Math.floor(Math.random() * (questions_fourth_arr.length-1))];
		document.getElementById('specific-fourth-test-question').innerText = specific_question_obj_fourth.description;
			
		for(let i=0;i<fourth_test_number_limit;i++){
			let input_box = document.createElement("INPUT");
			input_box.setAttribute("type", "text");
			input_box.classList.add('fourth-answer-input-box')
			document.getElementById('answer-fourth-block').append(input_box)
		}
		
	},(fourth_test_number_limit+2)*one_second)
}

document.getElementById('answer-fourth-block-submit').addEventListener('click',()=>{
	let correctly_answered = true;

for(let i=0;i<document.getElementById('answer-fourth-block').childNodes.length;i++){
   if(parseInt(document.getElementById('answer-fourth-block').childNodes[i].value) != specific_question_obj_fourth.calculate(fourth_test_question[i]) ){
	correctly_answered = false;
   }
}
	if(correctly_answered && fourth_test_answers.length<7){
		console.log('h')
		fourth_test_number_limit++;
		fourth_test_answers.push(fourth_test_number_limit);
		fourth_test_wrong_answers = 0;
		startFourthAssessment()
	}else if(fourth_test_answers.length<7){
		console.log('hereee')	
		fourth_test_answers.push(fourth_test_number_limit);
		fourth_test_wrong_answers++;
		if(fourth_test_wrong_answers==3){
			close_fourth_test();
		}else{
			startFourthAssessment()	
		}
	}
	if(fourth_test_answers.length<7){
		document.getElementById('answer-fourth-block-wrapper').style.display='none';
		document.getElementById('question-fourth-block-number').innerText = fourth_test_answers.length + 1;
		document.getElementById('question-fourth-block-wrapper').style.display='block';	
	}else{
		close_fourth_test()
	}
})

function close_fourth_test(){
	document.getElementById('fourth-block').style.display ='none';
	fourth_test_score = (((fourth_test_answers[fourth_test_answers.length-1])-1)*(25/7));
	document.getElementById('second-block').style.display ='block';
}
function show_results(){
	let total_score = parseFloat(first_test_score.toFixed(2)) + parseFloat(second_test_score.toFixed(2)) + parseFloat(third_test_score.toFixed(2)) + parseFloat(fourth_test_score.toFixed(2));
	document.getElementById('display-score-first').innerText = first_test_score.toFixed(2);
	document.getElementById('display-score-second').innerText = third_test_score.toFixed(2);
	document.getElementById('display-score-third').innerText = fourth_test_score.toFixed(2);
	document.getElementById('display-score-fourth').innerText = second_test_score.toFixed(2);
	document.getElementById('display-score-total').innerText = total_score;	
}


















