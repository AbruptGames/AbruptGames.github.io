<template>
    <form class="newsletter" @submit.prevent="subscribeNewsletter">
        <h2 class="sc">
            {{ t("beta-test-title") }}
        </h2>
        <p>
            {{ t("beta-test-text") }}
        </p>
        <div class="newsletter-form">
            <label>
                <span class="checkmark-text">{{ t("newsletter-subscription-checkbox") }}</span>
                <input type="checkbox" v-model="newsletter" :disabled="isLoading">
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
    import httpService from '@/services/http.service';
    import { AxiosError } from 'axios';
    import { ref, Ref, computed } from 'vue';
    import { useI18n } from 'vue-i18n';
    
    const { t } = useI18n();
    
    const email = ref('');
    const message = ref('');
    const messageType: Ref<"green" | "red"> = ref('green');
    const isLoading = ref(false);
    const newsletter = ref(true);

    const messageColor = computed(() => {
        return {
            active: true,
            "green": messageType.value === "green",
            "red": messageType.value === "red",
        }
    });

    const subscribeNewsletter = async () => {
        isLoading.value = true;
        try {
            const body = {
                email: email.value,
                language: navigator.language.startsWith("fr") ? "french" : "english",
                newsletter: newsletter.value
            }
            const { data } = await httpService.request("POST", "subscribe/", body);
            messageType.value = "green";
            message.value = `Welcome, ${data.email}! You have successfully subscribed.`;
        } catch (e: AxiosError | unknown) {
            if (e instanceof AxiosError && e.response?.data.message) {
                message.value = e.response.data.message;
            } else {
                message.value = "Unknown error happened"
            }
            messageType.value = "red";
        } finally {
            isLoading.value = false;
        }
    };
</script>

<style scoped>

    .newsletter {
        width: 100%;
        gap: 20px;
    }

    .newsletter h2 {
        margin-top: 0;
        color: var(--text-color-title-black);
    }

    .newsletter p {
        color: var(--text-color-black);
    }

    .newsletter-form {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .newsletter-form input[type="checkbox"] {
        accent-color: #34a0a4;
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
        padding: 8px;
        max-width: 300px;
        font-size: 1rem;
        outline: none;
        background-color: initial;
        border-color: var(--text-color-title-black);
        color: var(--text-color-title-black);
        border-width: 2px;
        border-style: solid;
        border-image: none;
    }

    .newsletter-input-and-button input::placeholder {
        color: var(--text-color-title-black);
    }

    @media (max-width: 800px) {
        .newsletter-input-and-button {
            justify-content: center;
        }
    }

    .newsletter button {
        font-family: "SugoPro";
        color: var(--text-color-title-black);
        background-color: initial;
        border-color: var(--text-color-title-black);
        border-width: 2px;
        border-style: solid;
        border-image: none;
        cursor: pointer;
        outline: none;
        padding: 3.5px 20px;
        font-size: 1.5rem;
        transition: transform 0.2s ease;
    }

    .newsletter button:hover {
        transform: scale(1.1);
    }

    .green {
        color: green;
    }

    .red {
        color: red;
    }


</style>