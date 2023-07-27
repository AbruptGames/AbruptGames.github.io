<template>
    <form class="newsletter" @submit.prevent="subscribeNewsletter">
        <h2 class="sc">
            {{ t("beta-test-title") }}
        </h2>
        <p>
            {{ t("beta-test-text") }}
        </p>
        <div v-if="!alreadySubscribed" class="newsletter-form">
            <label>
                <span class="checkmark-text">{{ t("newsletter-subscription-checkbox") }}</span>
                <input type="checkbox" v-model="subscribeToNewsletter" :disabled="isLoading">
            </label>
            <div class="newsletter-input-and-button">
                <input class="input-field" type="email" v-model="email" placeholder="Enter your email" required :disabled="isLoading">
                <button type="submit" :disabled="isLoading">
                    <span v-if="isLoading">⌛</span>
                    <span v-else>Join</span>
                </button>
            </div>
            <p :class="messageColor">{{ message }}</p>
        </div>
    </form>
</template>

<script setup lang="ts">
    import { ref, Ref, computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    
    const { t } = useI18n();
    
    const email = ref('');
    const message = ref('');
    const messageType: Ref<"green" | "red"> = ref('green');
    const isLoading = ref(false);
    const alreadySubscribed = ref(false);
    const subscribeToNewsletter = ref(true);

    const messageColor = computed(() => {
        return {
            active: true,
            "green": messageType.value === "green",
            "red": messageType.value === "red",
        }
    });

    const subscribeNewsletter = async () => {
        isLoading.value = true;
        console.log("start call");
        try {
            const response = await fetch(process.env.VUE_APP_BACKEND_URL + "subscriptions/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email: email.value,
                    language: navigator.language.startsWith("fr") ? "french" : "english"
                }),
            });
            console.log(response);
        
            if (!response.ok) {
                const error = await response.json();
                if (response.status == 409) {
                    alreadySubscribed.value = true;
                }
                message.value = error.message;
                messageType.value = "red";
            } else {
                const data = await response.json();
                messageType.value = "green";
                message.value = `Welcome, ${data.email}! You have successfully subscribed.`;
                alreadySubscribed.value = true;
            }
        } catch (e) {
            console.log(e);
            message.value = "An error occured. Please try again later.";
            messageType.value = "red";
        } finally {
            isLoading.value = false;
        }
    };
</script>

<style scoped>

    .newsletter {
        width: 100%;
        margin: auto;
        gap: 20px;
    }

    .newsletter h2 {
        margin-top: 0;
    }

    .newsletter-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .newsletter-form p {
        margin: 0;
        height: 20px;
    }

    .newsletter-input-and-button {
        display: flex;
        align-items: center;
        gap: 10px;
    }

    .newsletter-input-and-button input {
        font-family: "SugoPro";
        flex: 1 0 auto;
        padding: 10px;
        width: 300px;
        font-size: 16px;
        outline: none;
    }

    .newsletter button {
        font-family: "SugoPro";
        color: #fff;
        background-color: #007bff;
        border: none;
        cursor: pointer;
        outline: none;
        padding: 10px 20px;
        font-size: 20px;
        transition: background-color 0.2s ease;
    }

    .newsletter button:hover {
        background-color: #0056b3;
    }

    .green {
        color: green;
    }

    .red {
        color: red;
    }


</style>