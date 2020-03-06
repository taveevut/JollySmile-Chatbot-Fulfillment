# JollySmile-Chatbot-Fulfillment
> Dialogflow + Firebase Database
### Design Intent
- **Phase1 - Welcom**
	> - Input Context : 
	> - Output Context  : (2) awaiting_level
- **Phase1.1 - howAreYou**
	> - Input Context : awaiting_level
	> - Output Context : (2) awaiting_name
- **Phase2 - getName**
	> - Input Context : awaiting_name
	> - Output Context : (2)awaiting_heartbeat
	> - Fulfillment : enable
- **Phase2.1 - heartbeat**
	> - Input Context : awaiting_heartbeat
	> - Output Context : (2)awaiting_2q_1
	> - Fulfillment : enable
- **Phase3 - questionnaire2QTopic.1**
	> - Input Context : awaiting_2q_1
	> - Output Context : (2)awaiting_2q_2
	> - Fulfillment : enable
- **Phase3 - questionnaire2QTopic.2**
	> - Input Context : awaiting_2q_2
	> - Output Context : (2) Phase3-questionnaire2QTopic2-followup , (2)awaiting_9q
    > - Fulfillment : enable
	- **Phase3 - questionnaire2QTopic.2 - yes**
		> - Input Context :awaiting_9q, Phase3-questionnaire2QTopic2-followup
		> - Output Context : (2)awaiting_9q_1
		> - Fulfillment : enable
	- **Phase3 - questionnaire2QTopic.2 - no**
		> - Input Context : awaiting_9q,Phase3-questionnaire2QTopic2-followup
		> - Output Context : (2)ThankyouIntent-followup
- **Phase4 - questionnaire9QTopic.1**
	> - Input Context : awaiting_9q_1
	> - Output Context : (2)awaiting_9q_2
    > - Fulfillment : enable
- **Phase4 - questionnaire9QTopic.2**
	> - Input Context : awaiting_9q_2
	> - Output Context : (2)awaiting_9q_3
	> - Fulfillment : enable
- **Phase4 - questionnaire9QTopic.3**
	> - Input Context : awaiting_9q_3
	> - Output Context : (2)awaiting_9q_4
    > - Fulfillment : enable
- **Phase4 - questionnaire9QTopic.4**
	> - Input Context : awaiting_9q_4
	> - Output Context : (2)awaiting_9q_5
    > - Fulfillment : enable
- **Phase4 - questionnaire9QTopic.5**
	> - Input Context : awaiting_9q_5
	> - Output Context : (2)awaiting_9q_6
	> - Fulfillment : enable
- **Phase4 - questionnaire9QTopic.6**
	> - Input Context : awaiting_9q_6
	> - Output Context : (2)awaiting_9q_7
	> - Fulfillment : enable
- **Phase4 - questionnaire9QTopic.7**
	> - Input Context : awaiting_9q_7
	> - Output Context : (2)awaiting_9q_8
	> - Fulfillment : enable
- **Phase4 - questionnaire9QTopic.8**
	> - Input Context : awaiting_9q_8
	> - Output Context : (2)awaiting_9q_9
    > - Fulfillment : enable
- **Phase4 - questionnaire9QTopic.9**
	> - Input Context : awaiting_9q_9
	> - Output Context : (2)awaiting_st5_1
	> - Fulfillment : enable
- **Phase5 - questionnaireST-5Topic.1**
	> - Input Context : awaiting_st5_1
	> - Output Context : (2)awaiting_st5_2
	> - Fulfillment : enable
- **Phase5 - questionnaireST-5Topic.2**
	> - Input Context : awaiting_st5_2
	> - Output Context : (2)awaiting_st5_3
	> - Fulfillment : enable
- **Phase5 - questionnaireST-5Topic.3**
	> - Input Context : awaiting_st5_3
	> - Output Context : (2)awaiting_st5_4
	> - Fulfillment : enable
- **Phase5 - questionnaireST-5Topic.4**
	> - Input Context : awaiting_st5_4
	> - Output Context : (2)awaiting_st5_5
	> - Fulfillment : enable
- **Phase5 - questionnaireST-5Topic.5**
	> - Input Context : awaiting_st5_5
	> - Output Context : (2)awaiting_video_1
	> - Fulfillment : enable
- **Phase6 - WatchVideo.1**
	> - Input Context : awaiting_video_1
	> - Output Context : (2)awaiting_video_2
- **Phase6 - WatchVideo.2**
	> - Input Context : awaiting_video_2
	> - Output Context : (2)awaiting_video_3
- **Phase6 - WatchVideo.3**
	> - Input Context : awaiting_video_3
	> - Output Context : (2)awaiting_video_4
- **Phase6 - WatchVideo.4**
	> - Input Context : awaiting_video_4
	> - Output Context : (2)awaiting_9qend_1
- **Thank you Intent**
	> - Input Context : 
	> - Output Context : 

### Fulfillment Coding
- [`index.js`](index.js) 
- [`package.json`](package.json)
    ```javascript 
    ...
    "dialogflow": "^0.6.0",
    "dialogflow-fulfillment": "^0.6.1"
    ...
    ```
### Bot Designer
> [Download | LINE Bot Designer](https://developers.line.biz/en/services/bot-designer/)

<br>
<br>

---
<p align="center"> จัดทำโปรแกรมคอมพิวเตอร์พัฒนาระบบงานธุรกิจส่วนตัวและหน่วยงาน ใส่ใจคุณภาพ คุ้มราคา ส่งงานตรงเวลา<br>ติดต่อ 086-288-7987 (ท็อป) หรืออีเมล์    nakomah.web@gmail.com<br>ติดตามผลงานได้ที่ <a href="https://nakomah.com" target="_blank">www.nakomah.com</a></p>
