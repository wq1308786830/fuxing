//
//  HZSMMD52.h
//  HZSMKPaySDKDemo
//
//  Created by 徐帅 on 16/8/16.
//  Copyright © 2016年 Cuizhenwei. All rights reserved.
//

#import <Foundation/Foundation.h>
#import <CommonCrypto/CommonDigest.h>
@interface HZSMMD52 : NSObject
+ (NSString *)getMD5FromString:(NSDictionary *)sourceDic withKeyArray:(NSArray *)keyArray;
+ (void)aaa;
@end
