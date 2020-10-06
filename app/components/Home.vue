<template>
  <Page>
    <ActionBar title="Firebase Vue demo">
      <ActionItem @tap="onTapShare"
                  ios.systemIcon="9" ios.position="left"
                  android.systemIcon="ic_menu_share" android.position="actionBar"/>
      <NavigationButton text="Go back" android.systemIcon="ic_menu_back" @tap="goBack"/>
    </ActionBar>
    <GridLayout>
      <Label class="info">
        <FormattedString>
          <Span class="fas" text.decode="&#xf135; "/>
          <Span :text="message"/>
        </FormattedString>
      </Label>
      <!--<DatePicker v-model="selectedDate"/>-->
      <Button @tap="onTap()">Tap Me</Button>
    </GridLayout>
  </Page>
</template>

<script>
import {firebase} from "@nativescript/firebase"

export default {
  data() {
    return {
      message: 'Blank {N}-Vue app',
      selectedDate: ''
    }
  },

  methods: {
    onTap() {
      firebase.login({type: firebase.LoginType.ANONYMOUS})
          .then((user) => {
            alert('User uid:' + user.uid);
          }, (error) => {
            alert('Error:' + error);
          })
    }
  }
};
</script>

<style scoped lang="scss">
@import '~@nativescript/theme/scss/variables/blue';

// Custom styles
.fas {
  @include colorize($color: accent);
}

.info {
  font-size: 20;
  horizontal-align: center;
  vertical-align: center;
}
</style>
