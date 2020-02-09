<template>
    <div class="index">

        <div class="tContainer">

            <div class="question">

                <h1> {{ Question.question }} </h1>
                <br />
            </div>

            <div class="answers">
                <b-button variant="primary" v-on:click="answerChosen(1)" id="1"> {{ Question.q1 }} </b-button>

                <b-button variant="primary" v-on:click="answerChosen(2)" id="2"> {{ Question.q2 }} </b-button>

                <b-button variant="primary" v-on:click="answerChosen(3)" id="3"> {{ Question.q3 }} </b-button>

                <b-button variant="primary" v-on:click="answerChosen(4)" id="4"> {{ Question.q4 }} </b-button>
            </div>
        </div>

        <div class="footer">
            <div id="lab_social_icon_footer">
                <div class="text-center">
                    <a href="https://www.facebook.com/uofoklahoma/"><i id="social-fb" class="fa fa-facebook-square fa-3x social"></i></a>
                    <a href="https://twitter.com/UofOklahoma"><i id="social-tw" class="fa fa-twitter-square fa-3x social"></i></a>
                    <a href="mailto:#"><i id="social-em" class="fa fa-envelope-square fa-3x social"></i></a>
                </div>
            </div>
        </div>

        <div id="background-wrap">
            <div class="bubble x1"></div>
            <div class="bubble x2"></div>
            <div class="bubble x3"></div>
            <div class="bubble x4"></div>
            <div class="bubble x5"></div>
            <div class="bubble x6"></div>
            <div class="bubble x7"></div>
            <div class="bubble x8"></div>
            <div class="bubble x9"></div>
            <div class="bubble x10"></div>
        </div>
    </div>
</template>

<script>


    import { db } from '../main.js';

    import * as firebase from "firebase/app";
    import "firebase/auth";

    export default {
        name: "Question",
        props: {
            msg: String
        },

        data() {
            return {

                Question: {
                    question: null,
                    q1: null,
                    q2: null,
                    q3: null,
                    q4: null,
                    correct: null
                },

                curUser: null,
                curQuestion: 0,

                answerCorrect: null
            }
        },
        methods: {
            answerChosen(selection) {
                if (selection == this.Question.correct) {
                    if (this.curUser != null) {
                        db.collection("users").where('email', '==', this.curUser).get().then((snapshot) => {

                            snapshot.docs.forEach(doc => {
                                doc.ref.update({ score: doc.data().score + 1 });
                                doc.ref.update({ questionnum: doc.data().questionnum + 1 });
                                console.log(doc.id, " => ", doc.data());
                            });
                        });
                    }

                    this.answerCorrect = true;
                    this.selectedQuestion(selection, this.answerCorrect);

                }
                else {
                    if (this.curUser != null) {
                        db.collection("users").where('email', '==', this.curUser).get().then((snapshot) => {

                            snapshot.docs.forEach(doc => {
                                doc.ref.update({ score: doc.data().score });
                                doc.ref.update({ questionnum: doc.data().questionnum + 1 });
                                console.log(doc.id, " => ", doc.data());
                            });
                        });
                    }
                    this.answerCorrect = false;
                    this.selectedQuestion(selection, this.answerCorrect);

                }

                setInterval(function () {
                    setTimeout(() => {
                        this.curQuestion = this.curQuestion + 1;
                        document.getElementById('1').style.cssText = "background-color: " + "blue";

                        document.getElementById('2').style.cssText = "background-color: " + "blue";

                        document.getElementById('3').style.cssText = "background-color: " + "blue";

                        document.getElementById('4').style.cssText = "background-color: " + "blue";

                        this.answerCorrect = null;
                        this.getQuestion(this.curQuestion);

                    }, 3000);

                }, 1000);



            },
            getQuestion(qnum) {
                console.log("Getting Question " + qnum);
                db.collection("questions").where('questionnum', '==', qnum).get().then((snapshot) => {

                    snapshot.docs.forEach(doc => {
                        this.Question.q1 = doc.data().q1;
                        this.Question.q2 = doc.data().q2;
                        this.Question.q3 = doc.data().q3;
                        this.Question.q4 = doc.data().q4;

                        document.getElementById('1').style.cssText = "background-color: " + "blue";

                        document.getElementById('2').style.cssText = "background-color: " + "blue";

                        document.getElementById('3').style.cssText = "background-color: " + "blue";

                        document.getElementById('4').style.cssText = "background-color: " + "blue";
                        this.Question.correct = doc.data().correct;
                        this.Question.question = doc.data().question;
                        console.log("questionnum" + doc.data().questionnum + " user" + this.curQuestion);
                        console.log(doc.id, " => ", doc.data());
                    });
                });



            },
            checkLogin() {
                var user = firebase.auth().currentUser;
                if (user) {
                    this.curUser = user.email;

                    db.collection("users").where('email', '==', this.curUser).get().then((snapshot) => {

                        snapshot.docs.forEach(doc => {
                            this.curQuestion = doc.data().questionnum;
                            console.log(doc.id, " => ", doc.data());
                            this.getQuestion(doc.data().questionnum);


                        });
                    });

                    console.log("Signed In");
                }
                else {
                    console.log("Not Signed In");
                    this.getQuestion(0);

                }


            },
            selectedQuestion(id, iscorrect) {
                console.debug("What" + id);
                if (iscorrect)
                    document.getElementById(id).style.cssText = "background-color: " + "green";
                else if (!iscorrect)
                    document.getElementById(id).style.cssText = "background-color: " + "red";

                this.curQuestion = this.curQuestion + 1;
                this.getQuestion(this.curQuestion);


            }
        },
        mounted() {
            this.checkLogin();
        },



    };
</script>


<style lang="scss">


    @import url("http://maxcdn.bootstrapcdn.com/font-awesome/4.1.0/css/font-awesome.min.css");

    #lab_social_icon_footer {
        background-color: #555555;
        height: 60px;
    }

        #lab_social_icon_footer a {
            color: #FFFFFF;
        }

        #lab_social_icon_footer .social:hover {
            -webkit-transform: scale(1.1);
            -moz-transform: scale(1.1);
            -o-transform: scale(1.1);
        }

        #lab_social_icon_footer .social {
            -webkit-transform: scale(0.1);
            /* Browser Variations: */
            -moz-transform: scale(0.1);
            -o-transform: scale(0.1);
            -webkit-transition-duration: 0.5s;
            -moz-transition-duration: 0.5s;
            -o-transition-duration: 0.5s;
        }

        #lab_social_icon_footer #social-fb:hover {
            color: #3B5998;
        }

        #lab_social_icon_footer #social-tw:hover {
            color: #4099FF;
        }

        #lab_social_icon_footer #social-em:hover {
            color: #f39c12;
        }

    .text-center {
        padding: 5px;
    }

    .footer {
        position: fixed;
        bottom: 0;
        left: 0;
        width: 100%;
    }

    .index {
        height: 100%;
        margin: 0 auto;
    }

    body {
        display: block;
        font-family: sans-serif;
        background: linear-gradient( #0caadc, #00ffb1);
        color: black;
        margin: 0 auto;
    }



    .tContainer {
        display: inline-block;
        border-radius: 25px;
        width: 40%;
        padding: 10px 10px;
        margin-top: 100px;
        background-color: white;
        align-content: center;
        box-shadow: 0 0 8px blue;
    }

    .question {
        text-align: center;
    }

    .answers {
        padding-bottom: 10px;
    }

        .answers button {
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

    #background-wrap {
        bottom: 0;
        left: 0;
        position: fixed;
        right: 0;
        top: 0;
        z-index: -1;
    }

    /* KEYFRAMES */

    @-webkit-keyframes animateBubble {
        0% {
            margin-top: 1000px;
        }

        100% {
            margin-top: -100%;
        }
    }

    @-moz-keyframes animateBubble {
        0% {
            margin-top: 1000px;
        }

        100% {
            margin-top: -100%;
        }
    }

    @keyframes animateBubble {
        0% {
            margin-top: 1000px;
        }

        100% {
            margin-top: -100%;
        }
    }

    @-webkit-keyframes sideWays {
        0% {
            margin-left: 0px;
        }

        100% {
            margin-left: 50px;
        }
    }

    @-moz-keyframes sideWays {
        0% {
            margin-left: 0px;
        }

        100% {
            margin-left: 50px;
        }
    }

    @keyframes sideWays {
        0% {
            margin-left: 0px;
        }

        100% {
            margin-left: 50px;
        }
    }

    /* ANIMATIONS */

    .x1 {
        -webkit-animation: animateBubble 25s linear infinite, sideWays 2s ease-in-out infinite alternate;
        -moz-animation: animateBubble 25s linear infinite, sideWays 2s ease-in-out infinite alternate;
        animation: animateBubble 25s linear infinite, sideWays 2s ease-in-out infinite alternate;
        left: -5%;
        top: 5%;
        -webkit-transform: scale(0.1);
        -moz-transform: scale(0.1);
        transform: scale(0.2);
    }

    .x2 {
        -webkit-animation: animateBubble 20s linear infinite, sideWays 4s ease-in-out infinite alternate;
        -moz-animation: animateBubble 20s linear infinite, sideWays 4s ease-in-out infinite alternate;
        animation: animateBubble 24s linear infinite, sideWays 4s ease-in-out infinite alternate;
        left: 5%;
        top: 80%;
        -webkit-transform: scale(0.2);
        -moz-transform: scale(0.2);
        transform: scale(0.1);
    }

    .x3 {
        -webkit-animation: animateBubble 28s linear infinite, sideWays 2s ease-in-out infinite alternate;
        -moz-animation: animateBubble 28s linear infinite, sideWays 2s ease-in-out infinite alternate;
        animation: animateBubble 23s linear infinite, sideWays 2s ease-in-out infinite alternate;
        left: 10%;
        top: 40%;
        -webkit-transform: scale(0.1);
        -moz-transform: scale(0.1);
        transform: scale(0.2);
    }

    .x4 {
        -webkit-animation: animateBubble 22s linear infinite, sideWays 3s ease-in-out infinite alternate;
        -moz-animation: animateBubble 22s linear infinite, sideWays 3s ease-in-out infinite alternate;
        animation: animateBubble 21s linear infinite, sideWays 3s ease-in-out infinite alternate;
        left: 20%;
        top: 0;
        -webkit-transform: scale(0.2);
        -moz-transform: scale(0.2);
        transform: scale(0.1);
    }

    .x5 {
        -webkit-animation: animateBubble 29s linear infinite, sideWays 4s ease-in-out infinite alternate;
        -moz-animation: animateBubble 29s linear infinite, sideWays 4s ease-in-out infinite alternate;
        animation: animateBubble 23s linear infinite, sideWays 4s ease-in-out infinite alternate;
        left: 30%;
        top: 50%;
        -webkit-transform: scale(0.2);
        -moz-transform: scale(0.2);
        transform: scale(0.1);
    }

    .x6 {
        -webkit-animation: animateBubble 21s linear infinite, sideWays 2s ease-in-out infinite alternate;
        -moz-animation: animateBubble 21s linear infinite, sideWays 2s ease-in-out infinite alternate;
        animation: animateBubble 25s linear infinite, sideWays 2s ease-in-out infinite alternate;
        left: 50%;
        top: 0;
        -webkit-transform: scale(0.1);
        -moz-transform: scale(0.1);
        transform: scale(0.2);
    }

    .x7 {
        -webkit-animation: animateBubble 20s linear infinite, sideWays 2s ease-in-out infinite alternate;
        -moz-animation: animateBubble 20s linear infinite, sideWays 2s ease-in-out infinite alternate;
        animation: animateBubble 21s linear infinite, sideWays 2s ease-in-out infinite alternate;
        left: 65%;
        top: 70%;
        -webkit-transform: scale(0.4);
        -moz-transform: scale(0.4);
        transform: scale(0.1);
    }

    .x8 {
        -webkit-animation: animateBubble 22s linear infinite, sideWays 3s ease-in-out infinite alternate;
        -moz-animation: animateBubble 22s linear infinite, sideWays 3s ease-in-out infinite alternate;
        animation: animateBubble 22s linear infinite, sideWays 3s ease-in-out infinite alternate;
        left: 80%;
        top: 10%;
        -webkit-transform: scale(0.2);
        -moz-transform: scale(0.2);
        transform: scale(0.2);
    }

    .x9 {
        -webkit-animation: animateBubble 29s linear infinite, sideWays 4s ease-in-out infinite alternate;
        -moz-animation: animateBubble 29s linear infinite, sideWays 4s ease-in-out infinite alternate;
        animation: animateBubble 25s linear infinite, sideWays 4s ease-in-out infinite alternate;
        left: 90%;
        top: 50%;
        -webkit-transform: scale(0.6);
        -moz-transform: scale(0.6);
        transform: scale(0.1);
    }

    .x10 {
        -webkit-animation: animateBubble 15s linear infinite, sideWays 2s ease-in-out infinite alternate;
        -moz-animation: animateBubble 15s linear infinite, sideWays 2s ease-in-out infinite alternate;
        animation: animateBubble 19s linear infinite, sideWays 2s ease-in-out infinite alternate;
        left: 80%;
        top: 80%;
        -webkit-transform: scale(0.2);
        -moz-transform: scale(0.2);
        transform: scale(0.2);
    }

    /* OBJECTS */

    .bubble {
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        -webkit-box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2), inset 0px 10px 30px 5px rgba(255, 255, 255, 1);
        -moz-box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2), inset 0px 10px 30px 5px rgba(255, 255, 255, 1);
        box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2), inset 0px 10px 30px 5px rgba(255, 255, 255, 1);
        height: 20px;
        position: absolute;
        width: 20px;
    }

        .bubble:after {
            background: -moz-radial-gradient(center, ellipse cover, rgba(255,255,255,0.5) 0%, rgba(255,255,255,0) 70%); /* FF3.6+ */
            background: -webkit-gradient(radial, center center, 0px, center center, 100%, color-stop(0%,rgba(255,255,255,0.5)), color-stop(70%,rgba(255,255,255,0))); /* Chrome,Safari4+ */
            background: -webkit-radial-gradient(center, ellipse cover, rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 70%); /* Chrome10+,Safari5.1+ */
            background: -o-radial-gradient(center, ellipse cover, rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 70%); /* Opera 12+ */
            background: -ms-radial-gradient(center, ellipse cover, rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 70%); /* IE10+ */
            background: radial-gradient(ellipse at center, rgba(255,255,255,0.5) 0%,rgba(255,255,255,0) 70%); /* W3C */
            filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#80ffffff', endColorstr='#00ffffff',GradientType=1 ); /* IE6-9 fallback on horizontal gradient */
            -webkit-border-radius: 50%;
            -moz-border-radius: 50%;
            border-radius: 20%;
            -webkit-box-shadow: inset 0 20px 30px rgba(255, 255, 255, 0.3);
            -moz-box-shadow: inset 0 20px 30px rgba(255, 255, 255, 0.3);
            box-shadow: inset 0 20px 30px rgba(255, 255, 255, 0.3);
            content: "";
            height: 180px;
            left: 10px;
            position: absolute;
            width: 180px;
        }
</style>
