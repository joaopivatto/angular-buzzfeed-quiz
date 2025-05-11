import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json"

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})

export class QuizzComponent implements OnInit {

  title:string = ""

  questions:any
  questionSelected:any

  answers:string[] = []
  answerSelected:string =""

  questionIndex:number =0
  questionMaxIndex:number=0

  finished:boolean = false

  constructor(){}

  ngOnInit(): void {

    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length
    }

  }

  playerChoose(value:string){
    this.answers.push(value)
    this.nextStep()
  }

  async nextStep(){
    this.questionIndex+=1

    if(this.questionMaxIndex > this.questionIndex){
        this.questionSelected = this.questions[this.questionIndex]
    }else{
      const finalAnswer:string = await this.checkResult(this.answers)
      this.finished = true
      this.answerSelected = quizz_questions.results[finalAnswer as keyof typeof quizz_questions.results ]
    }
  }

  async checkResult(answers: string[]): Promise<string> {
    const frequencyMap: Record<string, number> = {};

    for (const answer of answers) {
      frequencyMap[answer] = (frequencyMap[answer] || 0) + 1;
    }

    let mostFrequent = '';
    let highestCount = 0;

    for (const [key, count] of Object.entries(frequencyMap)) {
      if (count > highestCount) {
        mostFrequent = key;
        highestCount = count;
      }
    }

    return mostFrequent;
  }

  restart(){

    if(quizz_questions){
      this.finished = false
      this.title = quizz_questions.title

      this.questionIndex = 0
      this.questionMaxIndex = this.questions.length

      this.questions = quizz_questions.questions
      this.questionSelected = this.questions[this.questionIndex]

      this.answers = []
      this.answerSelected =""
    }
  }


}
