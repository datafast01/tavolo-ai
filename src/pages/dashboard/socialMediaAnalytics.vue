<script setup>
import avatar1 from '@images/avatars/avatar-1.png'
import avatar2 from '@images/avatars/avatar-2.png'
import avatar3 from '@images/avatars/avatar-3.png'
import avatar4 from '@images/avatars/avatar-4.png'
import avatar7 from '@images/avatars/avatar-7.png'
import avatar8 from '@images/avatars/avatar-8.png'

const meetingSchedules = [
    {
        profile: avatar4,
        with: '42.8k',
        dateTime: 'Number of likes',
        type: 'Business',
    },
    {
        profile: avatar8,
        with: '21.3k',
        dateTime: 'Number of followers',
        type: 'Meditation',
    },
    {
        profile: avatar7,
        with: '2.4k',
        dateTime: 'Number of comments',
        type: 'Meditation',
    },
    {
        profile: avatar3,
        with: '398k',
        dateTime: 'Number of visits',
        type: 'Meetup',
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
                        <VAvatar start :size="38" :image="meeting.profile" />
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
