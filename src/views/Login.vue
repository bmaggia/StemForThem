<template>
    <div>
        <div id="tContainer">
            <div v-if="ismember">
                <h3><b>Login</b></h3>
                <b-form @submit.prevent="pressed">
                    <b-container style="padding:20px">
                        <div class="login">
                            <b-form-input type="email" placeholder="login" v-model="email" />
                        </div>
                    </b-container>

                    <b-container style="padding:20px">
                        <div class="password">
                            <b-form-input type="password" placeholder="password" v-model="password" />
                        </div>
                    </b-container>

                    <b-button type="submit" variant="primary">Log In</b-button>

                    <div class="error" v-if="error">{{error.message}}</div>
                </b-form>

                <hr />
                <p>Not a member?</p>

                <b-button v-on:click="notUser">Sign Up!</b-button>

            </div>

            <div v-if="!ismember">
                <h3><b>Sign Up</b></h3>

                <b-form @submit.prevent="register">
                    <div class="login">
                        <b-container style="padding:20px">
                            <b-form-input type="email" placeholder="email addres" v-model="email" />
                        </b-container>
                    </div>
                    <div class="username">
                        <b-container style="padding:20px">
                            <b-form-input type="string" placeholder="username" v-model="username" />
                        </b-container>
                    </div>
                    <div class="password">
                        <b-container style="padding:20px">
                            <b-form-input type="password" placeholder="password" v-model="password" />
                        </b-container>
                    </div>


                    <b-button type="submit" variant="primary">Submit</b-button>

                    <div class="error" v-if="error">{{error.message}}</div>
                </b-form>
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
        methods: {
        notUser() {
              this.ismember = false;
              console.log(this.ismember);
          }, // SIGNUP
        pressed() {
          firebase
            .auth()
            .signInWithEmailAndPassword(this.email, this.password)
            .then(data => {
              console.log(data);
              this.$router.replace({ name: "home" });
            })
            .catch(error => {
                this.error = error;
            });
        }, // REGISTER
        register() {
            firebase
                .auth()
                .createUserWithEmailAndPassword(this.email, this.password)
                .then(() => {
                    console.log("here");
                    this.$router.replace({ name: "home" });
                })
                .catch(error => (this.error = error));


            db.collection("users").add({
                email: this.email,
                score: 0,
                questionnum: 0,
                username: this.username
            })
                .then(function (docRef) {
                    console.log("Document written with ID: ", docRef.id);
                })
                .catch(function (error) {
                    console.error("Error adding document: ", error);
                });
        }
    },
    data() {
    return {
      email: "",
      password: "",
      username: "",
      error: "",
      ismember: true
    };
  }
};
</script>

<style lang="scss">
    body {
        display: block;
        font-family: tahoma;
        background-color: bisque;
        color: black;
        margin: 2px;
    }

    .nav-bar {
        background: linear-gradient(-90deg, #84CF6A, #16C0B0);
        height: 60px;
    }


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
            -webkit-transform: scale(0.8);
            /* Browser Variations: */
            -moz-transform: scale(0.8);
            -o-transform: scale(0.8);
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


    #tContainer {
        display: block;
        border-radius: 25px;
        width: 320px;
        padding: 10px 10px;
        margin: 0 auto;
        background-color: white;
        align-content: center;
        box-shadow: 0 0 4px blue;
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
        -webkit-transform: scale(0.6);
        -moz-transform: scale(0.6);
        transform: scale(0.6);
    }

    .x2 {
        -webkit-animation: animateBubble 20s linear infinite, sideWays 4s ease-in-out infinite alternate;
        -moz-animation: animateBubble 20s linear infinite, sideWays 4s ease-in-out infinite alternate;
        animation: animateBubble 24s linear infinite, sideWays 4s ease-in-out infinite alternate;
        left: 5%;
        top: 80%;
        -webkit-transform: scale(0.4);
        -moz-transform: scale(0.4);
        transform: scale(0.4);
    }

    .x3 {
        -webkit-animation: animateBubble 28s linear infinite, sideWays 2s ease-in-out infinite alternate;
        -moz-animation: animateBubble 28s linear infinite, sideWays 2s ease-in-out infinite alternate;
        animation: animateBubble 23s linear infinite, sideWays 2s ease-in-out infinite alternate;
        left: 10%;
        top: 40%;
        -webkit-transform: scale(0.7);
        -moz-transform: scale(0.7);
        transform: scale(0.7);
    }

    .x4 {
        -webkit-animation: animateBubble 22s linear infinite, sideWays 3s ease-in-out infinite alternate;
        -moz-animation: animateBubble 22s linear infinite, sideWays 3s ease-in-out infinite alternate;
        animation: animateBubble 21s linear infinite, sideWays 3s ease-in-out infinite alternate;
        left: 20%;
        top: 0;
        -webkit-transform: scale(0.3);
        -moz-transform: scale(0.3);
        transform: scale(0.3);
    }

    .x5 {
        -webkit-animation: animateBubble 29s linear infinite, sideWays 4s ease-in-out infinite alternate;
        -moz-animation: animateBubble 29s linear infinite, sideWays 4s ease-in-out infinite alternate;
        animation: animateBubble 23s linear infinite, sideWays 4s ease-in-out infinite alternate;
        left: 30%;
        top: 50%;
        -webkit-transform: scale(0.5);
        -moz-transform: scale(0.5);
        transform: scale(0.5);
    }

    .x6 {
        -webkit-animation: animateBubble 21s linear infinite, sideWays 2s ease-in-out infinite alternate;
        -moz-animation: animateBubble 21s linear infinite, sideWays 2s ease-in-out infinite alternate;
        animation: animateBubble 25s linear infinite, sideWays 2s ease-in-out infinite alternate;
        left: 50%;
        top: 0;
        -webkit-transform: scale(0.8);
        -moz-transform: scale(0.8);
        transform: scale(0.8);
    }

    .x7 {
        -webkit-animation: animateBubble 20s linear infinite, sideWays 2s ease-in-out infinite alternate;
        -moz-animation: animateBubble 20s linear infinite, sideWays 2s ease-in-out infinite alternate;
        animation: animateBubble 21s linear infinite, sideWays 2s ease-in-out infinite alternate;
        left: 65%;
        top: 70%;
        -webkit-transform: scale(0.4);
        -moz-transform: scale(0.4);
        transform: scale(0.4);
    }

    .x8 {
        -webkit-animation: animateBubble 22s linear infinite, sideWays 3s ease-in-out infinite alternate;
        -moz-animation: animateBubble 22s linear infinite, sideWays 3s ease-in-out infinite alternate;
        animation: animateBubble 22s linear infinite, sideWays 3s ease-in-out infinite alternate;
        left: 80%;
        top: 10%;
        -webkit-transform: scale(0.3);
        -moz-transform: scale(0.3);
        transform: scale(0.3);
    }

    .x9 {
        -webkit-animation: animateBubble 29s linear infinite, sideWays 4s ease-in-out infinite alternate;
        -moz-animation: animateBubble 29s linear infinite, sideWays 4s ease-in-out infinite alternate;
        animation: animateBubble 25s linear infinite, sideWays 4s ease-in-out infinite alternate;
        left: 90%;
        top: 50%;
        -webkit-transform: scale(0.6);
        -moz-transform: scale(0.6);
        transform: scale(0.6);
    }

    .x10 {
        -webkit-animation: animateBubble 15s linear infinite, sideWays 2s ease-in-out infinite alternate;
        -moz-animation: animateBubble 15s linear infinite, sideWays 2s ease-in-out infinite alternate;
        animation: animateBubble 19s linear infinite, sideWays 2s ease-in-out infinite alternate;
        left: 80%;
        top: 80%;
        -webkit-transform: scale(0.3);
        -moz-transform: scale(0.3);
        transform: scale(0.3);
    }

    /* OBJECTS */

    .bubble {
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        -webkit-box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2), inset 0px 10px 30px 5px rgba(255, 255, 255, 1);
        -moz-box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2), inset 0px 10px 30px 5px rgba(255, 255, 255, 1);
        box-shadow: 0 20px 30px rgba(0, 0, 0, 0.2), inset 0px 10px 30px 5px rgba(255, 255, 255, 1);
        height: 200px;
        position: absolute;
        width: 200px;
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
            border-radius: 50%;
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