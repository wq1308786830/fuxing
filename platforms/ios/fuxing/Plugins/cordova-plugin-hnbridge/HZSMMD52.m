//
//  HZSMMD52.m
//  HZSMKPaySDKDemo
//
//  Created by 徐帅 on 16/8/16.
//  Copyright © 2016年 Cuizhenwei. All rights reserved.
//

#import "HZSMMD52.h"

@implementation HZSMMD52
- (id)init
{
    self = [super init];
    if (self) {
        // Initialization code here.
    }
    
    return self;
}

+ (NSString *)getMD5FromString:(NSDictionary *)sourceDic withKeyArray:(NSArray *)keyArray{
    NSMutableArray * allArray=[[NSMutableArray alloc]init];;
    
    for (int i=0; i<[keyArray count]; i++) {
        NSString * str=@"";
        if (i==[keyArray count]-1) {
            str=[NSString stringWithFormat:@"%@=%@||981213",[keyArray objectAtIndex:i],[sourceDic objectForKey:[keyArray objectAtIndex:i]]];
        }else{
            str=[NSString stringWithFormat:@"%@=%@&",[keyArray objectAtIndex:i],[sourceDic objectForKey:[keyArray objectAtIndex:i]]];
        }
        [allArray addObject:str];
        
    }
    NSString *source = [allArray componentsJoinedByString:@""];
    NSLog(@"外部 MD5 加密后 >>>source %@",source);
    
    NSStringEncoding encoding = CFStringConvertEncodingToNSStringEncoding(kCFStringEncodingGB_18030_2000);
    //    source = [source stringByAddingPercentEscapesUsingEncoding:NSUTF8StringEncoding];
    
    CC_MD5_CTX md5;
    CC_MD5_Init(&md5);
    NSData *fileAllData=[source dataUsingEncoding:encoding];
    NSRange range;
    int i = 0;
    BOOL done=NO;
    while (!done) {
        range.location = i*1024;
        NSData *fileData;
        if(range.location+1024<=fileAllData.length){
            range.length = 1024;
            fileData=[fileAllData subdataWithRange:range];
        }
        else if(range.location+1<=fileAllData.length){
            range.length = fileAllData.length-range.location;
            fileData=[fileAllData subdataWithRange:range];
        }
        else{
            break;
        }
        
        CC_MD5_Update(&md5, [fileData bytes], (CC_LONG)[fileData length]);
        if([fileData length]==0)
            done=YES;
        
        i++;
    }
    unsigned char digest[CC_MD5_DIGEST_LENGTH];
    CC_MD5_Final(digest, &md5);
    NSString* s = [NSString stringWithFormat: @"%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x%02x",
                   digest[0], digest[1],
                   digest[2], digest[3],
                   digest[4], digest[5],
                   digest[6], digest[7],
                   digest[8], digest[9],
                   digest[10], digest[11],
                   digest[12], digest[13],
                   digest[14], digest[15]];
    return s;
}
@end
