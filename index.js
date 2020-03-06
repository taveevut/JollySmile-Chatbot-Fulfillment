// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const {
    WebhookClient,
    Payload
} = require('dialogflow-fulfillment');
const {
    Card,
    Suggestion
} = require('dialogflow-fulfillment');

const admin = require('firebase-admin');
admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://doctorstrainagent-uivoaw.firebaseio.com'
});

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
    const agent = new WebhookClient({
        request,
        response
    });
    console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
    console.log('Dialogflow Request body: ' + JSON.stringify(request.body));
    const sessionId = request.body.session.split("/").reverse()[0];
    const timestamp = new Date().getTime();

    function welcome(agent) {
        agent.add(`Welcome to my agent!`);
    }

    function fallback(agent) {
        agent.add(`I didn't understand`);
        agent.add(`I'm sorry, can you try again?`);
    }


    function generateQuestion9Q(topic_number) {
        const flexMessage = {
            "type": "flex",
            "altText": "แบบทดสอบ 9Q ข้อที่ " + topic_number,
            "contents": {
                "type": "bubble",
                "direction": "ltr",
                "hero": {
                    "type": "image",
                    "url": "https://nakomah.com/dialogflow/images/q9." + topic_number + ".jpg?v=" + timestamp,
                    "size": "full",
                    "aspectRatio": "1.51:1",
                    "aspectMode": "fit",
                    "backgroundColor": "#346635"
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [{
                            "type": "text",
                            "text": "ตอบคำถามจากรูปภาพ",
                            "align": "center",
                            "color": "#BBBBBB"
                        },
                        {
                            "type": "text",
                            "text": "ท่านมีอาการเหล่านี้หรือไม่ ?",
                            "align": "center"
                        },
                        {
                            "type": "separator",
                            "margin": "md"
                        }
                    ]
                },
                "footer": {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [{
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "sm",
                        "margin": "sm",
                        "contents": [{
                                "type": "button",
                                "action": {
                                    "type": "message",
                                    "label": "ไม่มีเลย",
                                    "text": "ไม่มีเลย"
                                },
                                "color": "#F6CECB",
                                "height": "sm",
                                "style": "primary"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "message",
                                    "label": "เป็นบางวัน",
                                    "text": "เป็นบางวัน"
                                },
                                "color": "#F69597",
                                "height": "sm",
                                "style": "primary"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "message",
                                    "label": "เป็นบ่อย",
                                    "text": "เป็นบ่อย"
                                },
                                "color": "#E35D68",
                                "height": "sm",
                                "style": "primary"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "message",
                                    "label": "เป็นทุกวัน",
                                    "text": "เป็นทุกวัน"
                                },
                                "color": "#CC4552",
                                "height": "sm",
                                "style": "primary"
                            }
                        ]
                    }]
                }
            }
        };
        let payload = new Payload(`LINE`, flexMessage, {
            sendAsMessage: true
        });
        return agent.add(payload);
    }

    function generateVideos(title, url, thumbnail) {
        const flexMessage = {
            "type": "flex",
            "altText": "วิธีการและเทคนิค",
            "contents": {
                "type": "bubble",
                "direction": "ltr",
                "header": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [{
                        "type": "text",
                        "text": title,
                        "align": "center",
                        "weight": "bold"
                    }]
                },
                "hero": {
                    "type": "image",
                    "url": thumbnail,
                    "size": "full",
                    "aspectRatio": "1.51:1",
                    "aspectMode": "cover"
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [{
                            "type": "text",
                            "text": "คลิกดูวิดิโอและทำตาม",
                            "align": "center"
                        },
                        {
                            "type": "separator",
                            "margin": "md"
                        }
                    ]
                },
                "footer": {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [{
                            "type": "box",
                            "layout": "vertical",
                            "contents": [{
                                "type": "button",
                                "action": {
                                    "type": "uri",
                                    "label": "ดูวิดิโอ",
                                    "uri": url
                                },
                                "color": "#3F9DAC",
                                "height": "sm",
                                "style": "primary"
                            }]
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [{
                                "type": "button",
                                "action": {
                                    "type": "message",
                                    "label": "ถัดไป",
                                    "text": "ถัดไป"
                                },
                                "color": "#AAAAAA",
                                "height": "sm",
                                "style": "link"
                            }]
                        }
                    ]
                }
            }
        };
        let payload = new Payload(`LINE`, flexMessage, {
            sendAsMessage: true
        });
        return agent.add(payload);
    }

    function generateQuestionST5(topic_number) {
        const flexMessage = {
            "type": "flex",
            "altText": "แบบทดสอบ ST-5 ข้อที่ " + topic_number,
            "contents": {
                "type": "bubble",
                "direction": "ltr",
                "hero": {
                    "type": "image",
                    "url": "https://nakomah.com/dialogflow/images/ST5." + topic_number + ".jpg?v=" + timestamp,
                    "size": "full",
                    "aspectRatio": "1.51:1",
                    "aspectMode": "fit",
                    "backgroundColor": "#993365"
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [{
                            "type": "text",
                            "text": "ตอบคำถามจากรูปภาพ",
                            "align": "center",
                            "color": "#BBBBBB"
                        },
                        {
                            "type": "text",
                            "text": "ท่านมีอาการเหล่านี้หรือไม่ ?",
                            "align": "center"
                        },
                        {
                            "type": "separator",
                            "margin": "md"
                        }
                    ]
                },
                "footer": {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [{
                        "type": "box",
                        "layout": "vertical",
                        "spacing": "sm",
                        "margin": "sm",
                        "contents": [{
                                "type": "button",
                                "action": {
                                    "type": "message",
                                    "label": "แทบไม่มี",
                                    "text": "แทบไม่มี"
                                },
                                "color": "#F6CECB",
                                "height": "sm",
                                "style": "primary"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "message",
                                    "label": "เป็นบางครั้ง",
                                    "text": "เป็นบางครั้ง"
                                },
                                "color": "#F69597",
                                "height": "sm",
                                "style": "primary"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "message",
                                    "label": "บ่อยครั้ง",
                                    "text": "บ่อยครั้ง"
                                },
                                "color": "#E35D68",
                                "height": "sm",
                                "style": "primary"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "message",
                                    "label": "เป็นประจำ",
                                    "text": "เป็นประจำ"
                                },
                                "color": "#CC4552",
                                "height": "sm",
                                "style": "primary"
                            }
                        ]
                    }]
                }
            }
        };
        let payload = new Payload(`LINE`, flexMessage, {
            sendAsMessage: true
        });
        return agent.add(payload);
    }

    function getName(agent) {
        const name = agent.parameters.name;
        return admin.database().ref('/twoq').child(sessionId).set({
            name: name
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            const flexMessage = {
                "type": "flex",
                "altText": "ความรู้สึกตอนนี้เป็นอย่างไรบ้าง",
                "contents": {
                    "type": "bubble",
                    "direction": "ltr",
                    "hero": {
                        "type": "image",
                        "url": "https://nakomah.com/dialogflow/images/heartbeat.jpg?v=" + timestamp,
                        "margin": "md",
                        "align": "center",
                        "size": "full",
                        "aspectRatio": "1.51:1",
                        "aspectMode": "fit",
                        "backgroundColor": "#89373C"
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [{
                                "type": "text",
                                "text": `คุณ${name}ค่ะ`,
                                "align": "center",
                                "weight": "bold",
                                "color": "#16A196"
                            },
                            {
                                "type": "text",
                                "text": "ความรู้สึกตอนนี้เป็นอย่างไรบ้าง ?",
                                "align": "center"
                            },
                            {
                                "type": "separator",
                                "margin": "md"
                            }
                        ]
                    },
                    "footer": {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [{
                                "type": "button",
                                "action": {
                                    "type": "message",
                                    "label": "เครียด",
                                    "text": "เครียด"
                                },
                                "margin": "xs",
                                "height": "sm"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "message",
                                    "label": "เบื่อ",
                                    "text": "เบื่อ"
                                },
                                "margin": "xs",
                                "height": "sm"
                            },
                            {
                                "type": "button",
                                "action": {
                                    "type": "message",
                                    "label": "เซ็ง",
                                    "text": "เซ็ง"
                                },
                                "margin": "xs",
                                "height": "sm"
                            }
                        ]
                    },
                    "styles": {
                        "hero": {
                            "backgroundColor": "#DBC72D"
                        }
                    }
                }
            };
            let payload = new Payload(`LINE`, flexMessage, {
                sendAsMessage: true
            });
            agent.add(payload);
        });
    }

    function getHeartbeat(agent) {
        const heartbeat = agent.parameters.heartbeat;
        const flexMessage = {
            "type": "flex",
            "altText": "แบบทดสอบ 2Q ข้อที่ 1",
            "contents": {
                "type": "bubble",
                "direction": "ltr",
                "hero": {
                    "type": "image",
                    "url": "https://nakomah.com/dialogflow/images/2q.1.jpg?v=" + timestamp,
                    "align": "center",
                    "size": "full",
                    "aspectRatio": "1.51:1",
                    "aspectMode": "fit"
                },
                "body": {
                    "type": "box",
                    "layout": "vertical",
                    "contents": [{
                            "type": "text",
                            "text": "ตอบคำถามจากรูปภาพ",
                            "align": "center",
                            "color": "#BBBBBB"
                        },
                        {
                            "type": "text",
                            "text": "ท่านมีอาการเหล่านี้หรือไม่ ?",
                            "align": "center"
                        },
                        {
                            "type": "separator",
                            "margin": "md"
                        }
                    ]
                },
                "footer": {
                    "type": "box",
                    "layout": "horizontal",
                    "contents": [{
                            "type": "box",
                            "layout": "vertical",
                            "contents": [{
                                "type": "button",
                                "action": {
                                    "type": "message",
                                    "label": "มี",
                                    "text": "มี",
                                },
                                "color": "#DBC72D",
                                "height": "sm",
                                "style": "primary"
                            }]
                        },
                        {
                            "type": "box",
                            "layout": "vertical",
                            "contents": [{
                                "type": "button",
                                "action": {
                                    "type": "message",
                                    "label": "ไม่มี",
                                    "text": "ไม่มี"
                                },
                                "color": "#AAAAAA",
                                "height": "sm"
                            }]
                        }
                    ]
                },
                "styles": {
                    "hero": {
                        "backgroundColor": "#DBC72D"
                    }
                }
            }
        };
        let payload = new Payload(`LINE`, flexMessage, {
            sendAsMessage: true
        });
        agent.add(payload);
    }

    function get2QAnsTopic1(agent) {
        const twoq_ans1 = agent.parameters.twoq_ans1;

        return admin.database().ref('/twoq').child(sessionId).update({
            twoq_ans1: twoq_ans1
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            const flexMessage = {
                "type": "flex",
                "altText": "แบบทดสอบ 2Q ข้อที่ 2",
                "contents": {
                    "type": "bubble",
                    "direction": "ltr",
                    "hero": {
                        "type": "image",
                        "url": "https://nakomah.com/dialogflow/images/2q.2.jpg?v=" + timestamp,
                        "align": "center",
                        "size": "full",
                        "aspectRatio": "1.51:1",
                        "aspectMode": "fit"
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [{
                                "type": "text",
                                "text": "ตอบคำถามจากรูปภาพ",
                                "align": "center",
                                "color": "#BBBBBB"
                            },
                            {
                                "type": "text",
                                "text": "ท่านมีอาการเหล่านี้หรือไม่ ?",
                                "align": "center"
                            },
                            {
                                "type": "separator",
                                "margin": "md"
                            }
                        ]
                    },
                    "footer": {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [{
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "button",
                                    "action": {
                                        "type": "message",
                                        "label": "ใช่",
                                        "text": "ใช่",
                                    },
                                    "color": "#DBC72D",
                                    "height": "sm",
                                    "style": "primary"
                                }]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "button",
                                    "action": {
                                        "type": "message",
                                        "label": "ไม่ใช่",
                                        "text": "ไม่"
                                    },
                                    "color": "#AAAAAA",
                                    "height": "sm"
                                }]
                            }
                        ]
                    },
                    "styles": {
                        "hero": {
                            "backgroundColor": "#DBC72D"
                        }
                    }
                }
            };
            let payload = new Payload(`LINE`, flexMessage, {
                sendAsMessage: true
            });
            agent.add(payload);
        });
    }

    function get2QAnsTopic2(agent) {
        // const name = agent.getContext('awaiting_name').parameters.name;
        const twoq_ans1 = agent.getContext('awaiting_2q_2').parameters.twoq_ans1;
        const twoq_ans2 = agent.parameters.twoq_ans2;

        return admin.database().ref('/twoq').child(sessionId).update({
            twoq_ans2: twoq_ans2
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            let set_twoq_ans1 = (twoq_ans1 == 'มี') ? 1 : 0;
            let set_twoq_ans2 = (twoq_ans2 == 'ใช่') ? 1 : 0;
            let sum = (set_twoq_ans1 + set_twoq_ans2);
            let imageurl = (sum <= 0) ? "2q-result-happy.jpg?v=" + timestamp : "2q-result.jpg?v=" + timestamp;
            const flexMessage = {
                "type": "flex",
                "altText": "Flex Message",
                "contents": {
                    "type": "bubble",
                    "direction": "ltr",
                    "hero": {
                        "type": "image",
                        "url": "https://nakomah.com/dialogflow/images/" + imageurl,
                        "margin": "none",
                        "size": "full",
                        "aspectRatio": "1.51:1",
                        "aspectMode": "fit",
                        "backgroundColor": "#545454"
                    },
                    "body": {
                        "type": "box",
                        "layout": "vertical",
                        "contents": [{
                                "type": "text",
                                "text": "แนะนำให้ประเมินละเอียดยิ่งขึ้น",
                                "align": "center"
                            },
                            {
                                "type": "separator",
                                "margin": "md"
                            }
                        ]
                    },
                    "footer": {
                        "type": "box",
                        "layout": "horizontal",
                        "contents": [{
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "button",
                                    "action": {
                                        "type": "message",
                                        "label": "ยินดี",
                                        "text": "ยินดี"
                                    },
                                    "height": "sm",
                                    "style": "primary"
                                }]
                            },
                            {
                                "type": "box",
                                "layout": "vertical",
                                "contents": [{
                                    "type": "button",
                                    "action": {
                                        "type": "message",
                                        "label": "ไม่ยินดี",
                                        "text": "ไม่ยินดี"
                                    },
                                    "color": "#AAAAAA",
                                    "height": "sm",
                                }]
                            }
                        ]
                    }
                }
            };
            let payload = new Payload(`LINE`, flexMessage, {
                sendAsMessage: true
            });
            agent.add(payload);
        });
    }

    function getQuestionnaire2QTopic2YesConfirm() {
        generateQuestion9Q(1);
    }

    function get9QAnsTopic1(agent) {
        let nineq_ans1 = agent.parameters.nineq_ans1;

        return admin.database().ref('/twoq').child(sessionId).update({
            nineq_ans1: nineq_ans1
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            generateQuestion9Q(2);
        });
    }

    function get9QAnsTopic2(agent) {
        let nineq_ans2 = agent.parameters.nineq_ans2;

        return admin.database().ref('/twoq').child(sessionId).update({
            nineq_ans2: nineq_ans2
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            generateQuestion9Q(3);
        });
    }

    function get9QAnsTopic3(agent) {
        let nineq_ans3 = agent.parameters.nineq_ans3;

        return admin.database().ref('/twoq').child(sessionId).update({
            nineq_ans3: nineq_ans3
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            generateQuestion9Q(4);
        });
    }

    function get9QAnsTopic4(agent) {
        let nineq_ans4 = agent.parameters.nineq_ans4;

        return admin.database().ref('/twoq').child(sessionId).update({
            nineq_ans4: nineq_ans4
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            generateQuestion9Q(5);
        });
    }

    function get9QAnsTopic5(agent) {
        let nineq_ans5 = agent.parameters.nineq_ans5;

        return admin.database().ref('/twoq').child(sessionId).update({
            nineq_ans5: nineq_ans5
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            generateQuestion9Q(6);
        });
    }

    function get9QAnsTopic6(agent) {
        let nineq_ans6 = agent.parameters.nineq_ans6;

        return admin.database().ref('/twoq').child(sessionId).update({
            nineq_ans6: nineq_ans6
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            generateQuestion9Q(7);
        });
    }

    function get9QAnsTopic7(agent) {
        let nineq_ans7 = agent.parameters.nineq_ans7;
        return admin.database().ref('/twoq').child(sessionId).update({
            nineq_ans7: nineq_ans7
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            generateQuestion9Q(8);
        });
    }

    function get9QAnsTopic8(agent) {
        let nineq_ans8 = agent.parameters.nineq_ans8;
        return admin.database().ref('/twoq').child(sessionId).update({
            nineq_ans8: nineq_ans8
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            generateQuestion9Q(9);
        });
    }

    function get9QAnsTopic9(agent) {
        const arr9QAns = new Map();
        arr9QAns.set('ไม่มีเลย', 0);
        arr9QAns.set('เป็นบางวัน', 1);
        arr9QAns.set('เป็นบ่อย', 2);
        arr9QAns.set('เป็นทุกวัน', 3);

        let nineq_ans9 = agent.parameters.nineq_ans9;
        return admin.database().ref('/twoq').child(sessionId).update({
            nineq_ans9: nineq_ans9
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            return admin.database().ref('/twoq/' + sessionId).once("value").then(function (snapshot) {
                let nineq_ans1 = snapshot.child("nineq_ans1").val();
                let nineq_ans2 = snapshot.child("nineq_ans2").val();
                let nineq_ans3 = snapshot.child("nineq_ans3").val();
                let nineq_ans4 = snapshot.child("nineq_ans4").val();
                let nineq_ans5 = snapshot.child("nineq_ans5").val();
                let nineq_ans6 = snapshot.child("nineq_ans6").val();
                let nineq_ans7 = snapshot.child("nineq_ans7").val();
                let nineq_ans8 = snapshot.child("nineq_ans8").val();
                let nineq_sum = parseInt(arr9QAns.get(nineq_ans1)) + parseInt(arr9QAns.get(nineq_ans2)) + parseInt(arr9QAns.get(nineq_ans2)) + parseInt(arr9QAns.get(nineq_ans3)) + parseInt(arr9QAns.get(nineq_ans4)) + parseInt(arr9QAns.get(nineq_ans5)) + parseInt(arr9QAns.get(nineq_ans6)) + parseInt(arr9QAns.get(nineq_ans7)) + parseInt(arr9QAns.get(nineq_ans8)) + parseInt(arr9QAns.get(nineq_ans9));

                if (nineq_sum >= 19) {
                    agent.add(`คุณมีภาวะซึมเศร้าระดับรุนแรง`);
                } else if (nineq_sum >= 13) {
                    agent.add(`คุณมีภาวะซึมเศร้าปานกลาง `);
                } else if (nineq_sum >= 7) {
                    agent.add(`คุณมีภาวะซึมเศร้าน้อยมาก`);
                } else {
                    agent.add(`ไม่มีภาวะซึมเศร้าหรือมีภาวะซึมเศร้าน้อยมาก`);
                }

                generateQuestionST5(1);
            });
        });
    }

    function getST5AnsTopic1(agent) {
        const st5_ans1 = agent.parameters.st5_ans1;
        return admin.database().ref('/twoq').child(sessionId).update({
            st5_ans1: st5_ans1
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            generateQuestionST5(2);
        });
    }

    function getST5AnsTopic2(agent) {
        const st5_ans2 = agent.parameters.st5_ans2;
        return admin.database().ref('/twoq').child(sessionId).update({
            st5_ans2: st5_ans2
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            generateQuestionST5(3);
        });
    }

    function getST5AnsTopic3(agent) {
        const st5_ans3 = agent.parameters.st5_ans3;
        return admin.database().ref('/twoq').child(sessionId).update({
            st5_ans3: st5_ans3
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            generateQuestionST5(4);
        });
    }

    function getST5AnsTopic4(agent) {
        const st5_ans4 = agent.parameters.st5_ans4;
        return admin.database().ref('/twoq').child(sessionId).update({
            st5_ans4: st5_ans4
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            generateQuestionST5(5);
        });
    }

    function getST5AnsTopic5(agent) {
        const arrST5Ans = new Map();
        arrST5Ans.set('แทบไม่มี', 0);
        arrST5Ans.set('เป็นบางครั้ง', 1);
        arrST5Ans.set('บ่อยครั้ง', 2);
        arrST5Ans.set('เป็นประจำ', 3);
        const st5_ans5 = agent.parameters.st5_ans5;

        return admin.database().ref('/twoq').child(sessionId).update({
            st5_ans5: st5_ans5
        }).then((snapshot) => {
            // console.log('database write sucessful: ' + snapshot.ref.toString());
            return admin.database().ref('/twoq/' + sessionId).once("value").then(function (snapshot) {
                let name = snapshot.child("name").val();
                let st5_ans1 = snapshot.child("st5_ans1").val();
                let st5_ans2 = snapshot.child("st5_ans2").val();
                let st5_ans3 = snapshot.child("st5_ans3").val();
                let st5_ans4 = snapshot.child("st5_ans4").val();
                let st5_ans5 = snapshot.child("st5_ans5").val();
                let st5_sum = parseInt(arrST5Ans.get(st5_ans1)) + parseInt(arrST5Ans.get(st5_ans2)) + parseInt(arrST5Ans.get(st5_ans3)) + parseInt(arrST5Ans.get(st5_ans4)) + parseInt(arrST5Ans.get(st5_ans5));
                if (st5_sum >= 10) {
                    agent.add(`คุณเครียดมากที่สุด`);
                } else if (st5_sum >= 8) {
                    agent.add(`คุณเครียดมาก`);
                } else if (st5_sum >= 5) {
                    agent.add(`คุณมีความเครียดเครียดปานกลาง`);
                } else {
                    agent.add(`คุณมีความเครียดน้อย`);
                }

                if (st5_sum >= 8) {
                    agent.add(new Payload("LINE", {
                        type: "sticker",
                        packageId: "11537",
                        stickerId: "52002751"
                    }, {
                        sendAsMessage: true
                    }));

                    agent.add(`Jolly แนะนำให้คุณ` + name + `ปรึกษาแพทย์ด่วนเลยนะค่ะ`);
                    agent.add(`ขอบคุณที่ไว้วางใจให้ Jolly เป็นผู้จัดการความเครียดของคุณค่ะ หากคุณเครียดเมื่อใดให้คิดถึง Jolly นะค่ะ`);
                    agent.setContext({
                        'name': 'awaiting_st5_5',
                        'lifespan': '0'
                    });
                } else {
                    generateVideos("วิธีการและเทคนิคการหายใจ", "https://www.youtube.com/watch?v=xEEo0iXrTcA", "https://i3.ytimg.com/vi/xEEo0iXrTcA/hqdefault.jpg");
                }
            });
        });
    }

    // // Uncomment and edit to make your own intent handler
    // // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
    // // below to get this function to be run when a Dialogflow intent is matched
    // function yourFunctionHandler(agent) {
    //   agent.add(`This message is from Dialogflow's Cloud Functions for Firebase editor!`);
    //   agent.add(new Card({
    //       title: `Title: this is a card title`,
    //       imageUrl: 'https://developers.google.com/actions/images/badges/XPM_BADGING_GoogleAssistant_VER.png',
    //       text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
    //       buttonText: 'This is a button',
    //       buttonUrl: 'https://assistant.google.com/'
    //     })
    //   );
    //   agent.add(new Suggestion(`Quick Reply`));
    //   agent.add(new Suggestion(`Suggestion`));
    //   agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
    // }

    // // Uncomment and edit to make your own Google Assistant intent handler
    // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
    // // below to get this function to be run when a Dialogflow intent is matched
    // function googleAssistantHandler(agent) {
    //   let conv = agent.conv(); // Get Actions on Google library conv instance
    //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
    //   agent.add(conv); // Add Actions on Google library responses to your agent's response
    // }
    // // See https://github.com/dialogflow/fulfillment-actions-library-nodejs
    // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

    // Run the proper function handler based on the matched Dialogflow intent name
    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);
    // intentMap.set('your intent name here', yourFunctionHandler);
    // intentMap.set('your intent name here', googleAssistantHandler);
    intentMap.set('Phase2 - getName', getName);
    intentMap.set('Phase2.1 - heartbeat', getHeartbeat);
    intentMap.set('Phase3 - questionnaire2QTopic.1', get2QAnsTopic1);
    intentMap.set('Phase3 - questionnaire2QTopic.2', get2QAnsTopic2);
    intentMap.set('Phase3 - questionnaire2QTopic.2 - yes', getQuestionnaire2QTopic2YesConfirm);
    intentMap.set('Phase4 - questionnaire9QTopic.1', get9QAnsTopic1);
    intentMap.set('Phase4 - questionnaire9QTopic.2', get9QAnsTopic2);
    intentMap.set('Phase4 - questionnaire9QTopic.3', get9QAnsTopic3);
    intentMap.set('Phase4 - questionnaire9QTopic.4', get9QAnsTopic4);
    intentMap.set('Phase4 - questionnaire9QTopic.5', get9QAnsTopic5);
    intentMap.set('Phase4 - questionnaire9QTopic.6', get9QAnsTopic6);
    intentMap.set('Phase4 - questionnaire9QTopic.7', get9QAnsTopic7);
    intentMap.set('Phase4 - questionnaire9QTopic.8', get9QAnsTopic8);
    intentMap.set('Phase4 - questionnaire9QTopic.9', get9QAnsTopic9);
    intentMap.set('Phase5 - questionnaireST-5Topic.1', getST5AnsTopic1);
    intentMap.set('Phase5 - questionnaireST-5Topic.2', getST5AnsTopic2);
    intentMap.set('Phase5 - questionnaireST-5Topic.3', getST5AnsTopic3);
    intentMap.set('Phase5 - questionnaireST-5Topic.4', getST5AnsTopic4);
    intentMap.set('Phase5 - questionnaireST-5Topic.5', getST5AnsTopic5);
    agent.handleRequest(intentMap);
});