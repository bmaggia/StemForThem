<template>
    <div>
        <div class="error" v-if="error">{{error.message}}</div>
        <div id="tContainer">

            <form @submit.prevent="pressed">
                <div class="form-group">

                    Register
                    <div class="question">
                        <b-form-input type="string" v-model="question" placeholder="question" />
                    </div>
                    <div class="q1">
                        <b-form-input type="string" v-model="q1" placeholder="q1" />
                    </div>
                    <div class="q2">
                        <b-form-input type="string" v-model="q2" placeholder="q2" />
                    </div>
                    <div class="q3">
                        <b-form-input type="string" v-model="q3" placeholder="q3" />
                    </div>
                    <div class="q4">
                        <b-form-input type="string" v-model="q4" placeholder="q4" />
                    </div>
                    <div class="correct">
                        <b-form-input type="int" v-model="correct" placeholder="correct" />
                    </div>
                    <div class="questionnum">
                        <b-form-input type="int" v-model="questionnum" placeholder="questionnum" />
                    </div>
                    <button type="submit">Add</button>

                </div>

            </form>
        </div>
    </div>


</template>

<script>
    import { db } from '../main.js';


export default {
  data() {
    return {

                    question: null,
                    q1: null,
                    q2: null, 
                    q3: null, 
                    q4: null,
                    correct: null,


                curUser: null,
                questionnum: 0
    };
  },
  methods: {
    pressed() {
          db.collection("questions").add({
              question: this.question,
              q1: this.q1,
              q2: this.q2,
              q3: this.q3,
              q4: this.q4,
              correct: parseInt(this.correct),
              questionnum: parseInt(this.questionnum),

            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
    }
  }
};
</script>


<style lang="scss">
    body {
        display: block;
        font-family: tahoma;
        background: linear-gradient( #0caadc, #00ffb1);
        height: 90vh;
        color: black;
        margin: 2px;
    }

    .nav-bar {
        background: linear-gradient(-90deg, #84CF6A, #16C0B0);
        height: 60px;
    }

    .footer {
	position: fixed;
	background-color: darkslategray;
	height: 60px;
	width: 100%;
	bottom: 0;
}


    #tContainer {
        display: block;
        border-radius: 25px;
        width: 15%;
        padding: 10px 10px;
        margin: 0 auto;
        background-color: white;
        align-content: center;
        box-shadow: 0 0 4px blue;
    }

    .question {
        text-align: center;
    }

    .answers button {
        padding: 10px 24px;
        display: block;
        margin: 5px auto;
    }

    button {
        margin-top: 5px;
        border: none;
        border-radius: 25px;
        background-color: #1E95EA;
        color: white;
        height: 40px;
        width: 90%;
        font-size: 14px;
    }
</style>