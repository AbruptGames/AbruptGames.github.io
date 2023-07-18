<template>
    <div class="main">
        <h1>Admin Panel</h1>

        <div class="email-template">
            <div>
                <h2>Email in French</h2>
                <label>Subject </label>
                <input type="text" v-model="emailTemplate.french.subject">
                <textarea v-model="emailTemplate.french.body"></textarea>
            </div>
            <div>
                <h2>Email in English</h2>
                <label>Subject </label>
                <input type="text" v-model="emailTemplate.english.subject">
                <textarea v-model="emailTemplate.english.body"></textarea>
            </div>
        </div>
        <div class="send-email-section">
            <label>Test receiver </label>
            <input type="text" v-model="testReceiver">
            <button @click="sendEmail">Send email</button>
            <button @click="setAsWelcomeEmail">Set as Welcome Email</button>
            <button @click="getWelcomeEmail">Fetch Current Welcome Email</button>
        </div>
        <div class="email-preview">
            <p v-html="emailTemplate.french.body"></p>
            <p v-html="emailTemplate.english.body"></p>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { ref } from 'vue';

    let testReceiver = ref("");
    let emailTemplate = ref({
        french: { subject: "", body: "" },
        english: { subject: "", body: "" }
    });

    const sendEmail = () => {
        const data = {
            destination: testReceiver.value,
            emailTemplate: emailTemplate.value,
        };

        console.log("sending email to " + testReceiver.value, data);
        fetch("http://localhost:4000/emails/test-email-template", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }

    const setAsWelcomeEmail = () => {
        const data = {
            emailTemplate: emailTemplate.value,
        };

        console.log("sending email to " + testReceiver.value, data);
        fetch("http://localhost:4000/emails/set-welcome-email", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
    }

    const getWelcomeEmail = () => {
        fetch("http://localhost:4000/emails/get-welcome-email")
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                emailTemplate.value = data;
            }).catch((err) => {
                console.log(err);
            });
    }
</script>

<style>

.main {
    padding: 50px;
}

.email-template {
    display: flex;
    justify-content: center;
    gap: 50px;
    padding-bottom: 50px;
}

.email-template div {
    flex: 1;
}

.email-template textarea {
    width: 100%;
    height: 400px;
    resize: vertical;
}

.email-preview {
    display: flex;
    justify-content: center;
    gap: 50px;
}

.email-preview p {
    width: 100%;
    height: 400px;
    text-align: left;
    padding: 25px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #2c3e50;
  color: white;
  height: 100vh;
}

body {
    margin: 0;
}

p {
    margin: 0;
}
</style>
