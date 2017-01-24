//
//  HZSMPaySDK.h
//  HZSMPaySDK
//
//  Created by cuizhenwei on 16/4/28.
//  Copyright © 2016年 Cuizhenwei. All rights reserved.
//

#import <Foundation/Foundation.h>
@protocol HZSMKPaySDKDelegate <NSObject>
@optional
- (void)closePayViewController:(NSDictionary *)param;//关闭插件使用方法，此方法为回调方法，由商户客户端实现。

@end
@interface HZSMKPaySDK : NSObject
{
#if __has_feature(objc_arc_weak)
    __weak id<HZSMKPaySDKDelegate> delegate;
#else
    __unsafe_unretained id<HZSMKPaySDKDelegate> delegate;
#endif
}

#if __has_feature(objc_arc_weak)
@property (nonatomic, weak) id <HZSMKPaySDKDelegate>delegate;
#else
@property (nonatomic, unsafe_unretained) id <HZSMKPaySDKDelegate>delegate;
#endif


+ (HZSMKPaySDK *)sharedInstance;

- (void)openPayViewControllerWithDelegate:(id<HZSMKPaySDKDelegate>)_delegate application:(UIApplication*)application param:(NSMutableDictionary *)_param;
@end
