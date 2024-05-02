<script setup>


const meetingSchedules = [
    {

        with: '42.8k',
        dateTime: 'Number of likes',
        type: 'Business',

        icon: 'mdi-heart-outline',
        color: 'error'
    },
    {

        with: '21.3k',
        dateTime: 'Number of followers',
        type: 'Meditation',
        icon: 'mdi-account-multiple',
        color: 'info'
    },
    {

        with: '2.4k',
        dateTime: 'Number of comments',
        type: 'Meditation',
        icon: 'mdi-message-outline',
        color: 'primary'
    },
    {

        with: '398k',
        dateTime: 'Number of visits',
        type: 'Meetup',
        icon: 'mdi-chart-bar',
        color: 'success'
    },


]

const meetingTypeUiColors = {
    Business: 'primary',
    Meditation: 'success',
    Meetup: 'secondary',
    Party: 'warning',
}
</script>

<template>
    <VCard>
        <!-- SECTION Card Header and Menu -->
        <VCardItem>
            <!-- 👉 Title -->
            <VCardTitle>Social Media Analytics</VCardTitle>

            <!-- 👉 menu -->

            <template #append>
                <div class="me-n3">
                    <MoreBtn />
                </div>
            </template>
        </VCardItem>
        <!-- !SECTION -->

        <!-- SECTION Meting Schedule -->
        <VCardText>
            <VList lines="two" class="card-list">
                <VListItem v-for="meeting in meetingSchedules" :key="meeting.type">
                    <!-- 👉 Avatar -->
                    <template #prepend>
                        <VAvatar v-if="meeting.icon" size="40" :color="meeting.color" class="elevation-2">
                            <VIcon :icon="meeting.icon" size="24" />
                        </VAvatar>
                    </template>

                    <!-- 👉 Title and Subtitle -->

                    <VListItemTitle class="text-sm font-weight-medium mb-1">
                        {{ meeting.with }}
                    </VListItemTitle>
                    <VListItemSubtitle class="text-no-wrap text-xs">
                        <!-- <VIcon start size="16" icon="mdi-calendar-blank" /> -->
                        <span>{{ meeting.dateTime }}</span>
                    </VListItemSubtitle>

                    <!-- 👉 Business Types -->
                    <!-- <template #append>
                        <VListItemAction>
                            <VChip density="compact" :color="meetingTypeUiColors[meeting.type]">
                                <span class="text-xs">
                                    {{ meeting.type }}
                                </span>
                            </VChip>
                        </VListItemAction>
                    </template> -->
                </VListItem>
            </VList>
        </VCardText>
        <!-- !SECTION -->
    </VCard>
</template>

<style lang="scss" scoped>
.card-list {
    --v-card-list-gap: 1.5rem;
}
</style>
