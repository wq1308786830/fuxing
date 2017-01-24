#import <Cordova/CDVPlugin.h>
#import <Cordova/CDVInvokedUrlCommand.h>

@interface CDVHNBridge : CDVPlugin

- (void)gotoPage:(CDVInvokedUrlCommand*)command;

- (void)setAccountId:(CDVInvokedUrlCommand*)command;

- (void)playVideoUrl:(CDVInvokedUrlCommand*)command;

- (void)getPushChannelId:(CDVInvokedUrlCommand*)command;

@end