<template>
    <div v-if="!admin">
        <h1>Access Denied</h1>
        <router-link to="/">&lt; Go back to main page</router-link>
    </div>
    <div v-if="admin" class="admin-main">
        <h1>Admin Panel</h1>
        <router-link to="/">&lt; Go back to main page</router-link>

        <div class="templates">
            <div class="template-element" v-for="template of savedTemplates" :key="template.Name">
                <div class="template-name" @click="getTemplate(template.Name)">
                    <span> {{ template.Name }} </span>
                </div>
                <div class="delete-template-button" @click="deleteTemplate(template.Name)">X</div>
            </div>
        </div>

        <div class="email-template">
            <div>
                <h2>Email in French</h2>
                <label>Subject</label>
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
        <div class="save-template-section">
            <label>Template name </label>
            <input type="text" v-model="templateName">
            <button @click="setTemplate(templateName)">Save template</button>
        </div>
        <div class="send-email-section">
            <label>Test receiver </label>
            <input type="text" v-model="testReceiver">
            <button @click="sendEmail">Send email</button>
            <button @click="setAsWelcomeEmail">Set as Welcome Email</button>
            <button @click="getWelcomeEmail">Fetch Current Welcome Email</button>
        </div>
        <div class="email-preview">
            <div v-html="emailTemplate.french.body"></div>
            <div v-html="emailTemplate.english.body"></div>
        </div>
    </div>
</template>

<script setup lang="ts">
    import { Ref, onMounted, ref } from 'vue';
    import httpService from "@/services/http.service";
    import { useRouter } from 'vue-router';
    import { AxiosError } from 'axios';

    interface TemplateMetadata {
        Name: string;
        CreatedTimeStamp: string;
    }
    
    interface BilingualEmailTemplate {
        french: EmailTemplate;
        english: EmailTemplate;
    }

    interface EmailTemplate {
        subject: string;
        body: string;
    }

    const router = useRouter();
    const admin = ref(false);
    const savedTemplates: Ref<TemplateMetadata[]> = ref([]);

    onMounted(async () => {
        admin.value = await httpService.checkAdmin();
        if (!admin.value) {
            router.push('/');
        }
        listTemplates();
    });

    const testReceiver = ref("");
    const emailTemplate: Ref<BilingualEmailTemplate> = ref({
        french: { subject: "", body: "" },
        english: { subject: "", body: "" }
    });

    const sendEmail = () => {
        const data = {
            destination: testReceiver.value,
            emailTemplate: emailTemplate.value,
        };

        console.log("sending email to " + testReceiver.value, data);
        httpService.requestAdmin("POST", "test-email-template", data);
    }

    const setAsWelcomeEmail = async () => {
        try {
            await httpService.requestAdmin("POST", "set-welcome-email", { emailTemplate: emailTemplate.value });
        } catch (error: AxiosError | unknown) {
            if (error instanceof AxiosError) {
                console.error(error.response?.data.message || error.message || error);
            } else {
                console.error(error);
            }
        }
    }

    const getWelcomeEmail = async () => {
        const res = await httpService.request("GET", "welcome-email-template");
        emailTemplate.value = res.data;
    }

    /** TEMPLATES */
    
    const templateName = ref("");

    const listTemplates = async () => {
        try {
            const res = await httpService.requestAdmin("GET", "templates");
            savedTemplates.value = res.data;
        } catch (error) {
            print_error(error)
        }
    }

    const getTemplate = async (templateName: string) => {
        try {
            const res = await httpService.requestAdmin("GET", "templates/" + templateName);
            emailTemplate.value = res.data;
        } catch (error) {
            print_error(error)
        }
    }

    const setTemplate = async (templateName: string) => {
        try {
            await httpService.requestAdmin("POST", "templates/" + templateName, { template: emailTemplate.value });
        } catch (error) {
            print_error(error)
        }
        listTemplates();
    }

    const deleteTemplate = async (templateName: string) => {
        const res = await httpService.requestAdmin("DELETE", "admin/templates/" + templateName);
        console.log(res);
        listTemplates();
    }

    function print_error(error: AxiosError | unknown) {
        if (error instanceof AxiosError) {
            console.error(error.response?.data.message || error.message || error);
        } else {
            console.error(error);
        }
    }
</script>

<style>

.admin-main {
    padding: 20px 50px;
    background-color: #2c3e50;
    color: white;
}

.admin-main a {
    color: white;
    text-decoration: none;
}

.admin-main a:hover {
    color: lightblue;
}

/** TEMPLATES  */

.templates {
    padding: 10px;
}

.template-element {
    display: flex;
}

.template-name {
    padding: 10px;
    background-color: #2c6094;
    cursor: pointer;
    width: 300px;
}

.template-name:hover {
    background-color: #234f7a;
}

.delete-template-button {
    padding: 10px;
    background-color: #4c258a;
    cursor: pointer;
}

.delete-template-button:hover {
    background-color: #3c1f6a;
}

/** EMAILS */

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
    text-align: left;
}
</style>
