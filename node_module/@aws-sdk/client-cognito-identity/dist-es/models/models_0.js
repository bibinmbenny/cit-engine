import { CognitoIdentityServiceException as __BaseException } from "./CognitoIdentityServiceException";
export var AmbiguousRoleResolutionType;
(function (AmbiguousRoleResolutionType) {
    AmbiguousRoleResolutionType["AUTHENTICATED_ROLE"] = "AuthenticatedRole";
    AmbiguousRoleResolutionType["DENY"] = "Deny";
})(AmbiguousRoleResolutionType || (AmbiguousRoleResolutionType = {}));
export class InternalErrorException extends __BaseException {
    constructor(opts) {
        super({
            name: "InternalErrorException",
            $fault: "server",
            ...opts,
        });
        this.name = "InternalErrorException";
        this.$fault = "server";
        Object.setPrototypeOf(this, InternalErrorException.prototype);
    }
}
export class InvalidParameterException extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidParameterException",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidParameterException";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidParameterException.prototype);
    }
}
export class LimitExceededException extends __BaseException {
    constructor(opts) {
        super({
            name: "LimitExceededException",
            $fault: "client",
            ...opts,
        });
        this.name = "LimitExceededException";
        this.$fault = "client";
        Object.setPrototypeOf(this, LimitExceededException.prototype);
    }
}
export class NotAuthorizedException extends __BaseException {
    constructor(opts) {
        super({
            name: "NotAuthorizedException",
            $fault: "client",
            ...opts,
        });
        this.name = "NotAuthorizedException";
        this.$fault = "client";
        Object.setPrototypeOf(this, NotAuthorizedException.prototype);
    }
}
export class ResourceConflictException extends __BaseException {
    constructor(opts) {
        super({
            name: "ResourceConflictException",
            $fault: "client",
            ...opts,
        });
        this.name = "ResourceConflictException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ResourceConflictException.prototype);
    }
}
export class TooManyRequestsException extends __BaseException {
    constructor(opts) {
        super({
            name: "TooManyRequestsException",
            $fault: "client",
            ...opts,
        });
        this.name = "TooManyRequestsException";
        this.$fault = "client";
        Object.setPrototypeOf(this, TooManyRequestsException.prototype);
    }
}
export var ErrorCode;
(function (ErrorCode) {
    ErrorCode["ACCESS_DENIED"] = "AccessDenied";
    ErrorCode["INTERNAL_SERVER_ERROR"] = "InternalServerError";
})(ErrorCode || (ErrorCode = {}));
export class ResourceNotFoundException extends __BaseException {
    constructor(opts) {
        super({
            name: "ResourceNotFoundException",
            $fault: "client",
            ...opts,
        });
        this.name = "ResourceNotFoundException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ResourceNotFoundException.prototype);
    }
}
export class ExternalServiceException extends __BaseException {
    constructor(opts) {
        super({
            name: "ExternalServiceException",
            $fault: "client",
            ...opts,
        });
        this.name = "ExternalServiceException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ExternalServiceException.prototype);
    }
}
export class InvalidIdentityPoolConfigurationException extends __BaseException {
    constructor(opts) {
        super({
            name: "InvalidIdentityPoolConfigurationException",
            $fault: "client",
            ...opts,
        });
        this.name = "InvalidIdentityPoolConfigurationException";
        this.$fault = "client";
        Object.setPrototypeOf(this, InvalidIdentityPoolConfigurationException.prototype);
    }
}
export var MappingRuleMatchType;
(function (MappingRuleMatchType) {
    MappingRuleMatchType["CONTAINS"] = "Contains";
    MappingRuleMatchType["EQUALS"] = "Equals";
    MappingRuleMatchType["NOT_EQUAL"] = "NotEqual";
    MappingRuleMatchType["STARTS_WITH"] = "StartsWith";
})(MappingRuleMatchType || (MappingRuleMatchType = {}));
export var RoleMappingType;
(function (RoleMappingType) {
    RoleMappingType["RULES"] = "Rules";
    RoleMappingType["TOKEN"] = "Token";
})(RoleMappingType || (RoleMappingType = {}));
export class DeveloperUserAlreadyRegisteredException extends __BaseException {
    constructor(opts) {
        super({
            name: "DeveloperUserAlreadyRegisteredException",
            $fault: "client",
            ...opts,
        });
        this.name = "DeveloperUserAlreadyRegisteredException";
        this.$fault = "client";
        Object.setPrototypeOf(this, DeveloperUserAlreadyRegisteredException.prototype);
    }
}
export class ConcurrentModificationException extends __BaseException {
    constructor(opts) {
        super({
            name: "ConcurrentModificationException",
            $fault: "client",
            ...opts,
        });
        this.name = "ConcurrentModificationException";
        this.$fault = "client";
        Object.setPrototypeOf(this, ConcurrentModificationException.prototype);
    }
}
