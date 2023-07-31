<template>
    <div class="main-monitoring">
        <h1>Monitoring</h1>
        <div>
            <div class="quotas" v-if="quotas">
                <h2>Quotas</h2>
                <ul>
                    <li>
                        <label>Max 24h send: </label>
                        <span>{{ quotas.Max24HourSend }}</span>
                    </li>
                    <li>
                        <label>Max send rate: </label>
                        <span>{{ quotas.MaxSendRate }}</span>
                    </li>
                    <li>
                        <label>Sent last 24h: </label>
                        <span>{{ quotas.SentLast24Hours }}</span>     
                    </li>
                </ul>
            </div>
            <table class="subscribed-table">
                <tr>
                    <th style="width: 200px">Email</th>
                    <th style="width: 200px">Date</th>
                    <th style="width: 200px">Key</th>
                    <th style="width: 200px">Newsletter</th>
                </tr>
                <tr v-for="subscribed of subscribedList" :key="subscribed.email">
                    <td>{{ subscribed?.email }}</td>
                    <td>{{ subscribed?.date?.toDateString() }}</td>
                    <td>{{ subscribed?.gameKey }}</td>
                    <td>{{ subscribed?.newsletter }}</td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script lang="ts" setup>
    import httpService from "@/services/http.service";
    import { Ref, onMounted, ref } from "vue";

    interface Subscribed {
        email: string,
        date: Date,
        gameKey?: string,
        newsletter: boolean,
    }

    interface Quotas {
        Max24HourSend: number;
        MaxSendRate: number;
        SentLast24Hours: number;
    }

    const subscribedList: Ref<Subscribed[]> = ref([]);

    const quotas: Ref<Quotas | undefined> = ref(undefined);


    onMounted(async () => {
        await getQuotas();
        await getSubscribedList();
    });

    const getQuotas = async () => {
        try {
            const data = await httpService.requestAdmin("GET", "quotas");
            quotas.value = data.data;
            console.log(data);
        } catch (e) {
            console.log(e);
        }
    }

    const getSubscribedList = async () => {
        try {
            const data = await httpService.requestAdmin("GET", "subscriptions");
            subscribedList.value = data.data;
        } catch (e) {
            console.log(e);
        }
    }

</script>

<style scoped>

    .main-monitoring {
        background-color: chocolate;
        padding: 20px;
        height: 100%;
    }

    .subscribed-table td,
    .subscribed-table tr {
        padding: 0 20px;
    }
    
</style>