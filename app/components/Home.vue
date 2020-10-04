<template>
  <Page>
    <ActionBar title="Firebase Vue demo"></ActionBar>
    <GridLayout>
      <Label class="info">
        <FormattedString>
          <Span class="fas" text.decode="&#xf135; "/>
          <Span :text="message"/>
        </FormattedString>
      </Label>
      <Button @tap="onTap()">Tap Me</Button>
    </GridLayout>
  </Page>
</template>

<script>
import {firebase} from "@nativescript/firebase"

export default {
  computed: {
    message() {
      return "Blank {N}-Vue app";
    }
  },

  methods: {
    onTap() {
      firebase.login({type: firebase.LoginType.ANONYMOUS})
          .then((user) => {
            alert('User uid:' + user.uid)
          }, (error) => {
            alert('Error:' + error);
          })

     /* firebase.addOnMessageReceivedCallback(
          (message) => {
            let contentId = null;
            let contentType = null;

            /!** if the app is already open, show a dialog message**!/
            if (message.foreground) {
              confirm({
                title: message.title,
                message: message.body,
                okButtonText: "open ",
                neutralButtonText: "cancel"
              }).then(function (result) {
                // result argument is boolean
                if (result) {
                  if (message.data.contentId && message.data.contentType) {
                    contentId = message.data.contentId;
                    contentType = message.data.contentType;
                  }
                }
                console.log("Dialog result: " + result);
              });
            }
          }
      );*/
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
