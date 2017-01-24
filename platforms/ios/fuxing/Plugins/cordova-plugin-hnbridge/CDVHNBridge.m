

#import "CDVHNBridge.h"
#import "MainViewController.h"
#import "HZSMKPaySDK.h"
#import "HZSMMD52.h"

@interface CDVHNBridge()<HZSMKPaySDKDelegate> {
    NSString* _payCallbackId;
}
@end


@implementation CDVHNBridge

- (void)pluginInitialize {
}

- (void)onReset {
}

- (void)gotoPage:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;
    NSString* page = [command.arguments objectAtIndex:0];

    if (page != nil && [page length] > 0) {

        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsString:page];
    } else {
        pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_ERROR];
    }

    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)setAccountId:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;

    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (void)getPushChannelId:(CDVInvokedUrlCommand*)command {
}


-(void)playVideoUrl:(CDVInvokedUrlCommand*)command {
    CDVPluginResult* pluginResult = nil;
    pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:command.callbackId];
}


- (NSString *)getCurrentInfo:(BOOL)date{
    NSDateFormatter *formatter = [[NSDateFormatter alloc]init];
    if (date) {
        [formatter setDateFormat:@"yyyyMMdd"];
    }else{
        [formatter setDateFormat:@"HHmmss"];
    }
    return [formatter stringFromDate:[NSDate date]];
}


-(void)payBySMK:(CDVInvokedUrlCommand*)command {
    NSString* params = [command.arguments objectAtIndex:0];
    NSString* sign = [command.arguments objectAtIndex:1];

    NSMutableDictionary *dic = [[NSMutableDictionary alloc] init];
    NSArray *dicParams = [params componentsSeparatedByString:NSLocalizedString(@"&", nil)];
    for (id item in dicParams) {
        NSArray *keyValue =[item componentsSeparatedByString:NSLocalizedString(@"=", nil)];
        [dic setObject:keyValue[1] forKey:keyValue[0]];
    }
    [dic setObject:sign forKey:@"mersign"];
    [dic setObject:@"1" forKey:@"paytype"];

    [[HZSMKPaySDK sharedInstance] openPayViewControllerWithDelegate:self application:[UIApplication sharedApplication] param:dic];

    _payCallbackId = command.callbackId;
}


- (void)closePayViewController:(NSDictionary *)param{
    CDVPluginResult* pluginResult = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK messageAsDictionary:param];
    [self.commandDelegate sendPluginResult:pluginResult callbackId:_payCallbackId];
}


@end
