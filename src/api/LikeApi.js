import { APIService } from "./axios";

export const likeAiCourse = (courseId) =>
  APIService.private.post(`/api/ai-courses/${courseId}/like`);

export const unlikeAiCourse = (courseId) =>
  APIService.private.delete(`/api/ai-courses/${courseId}/like`);

export const likeUserCourse = (courseId) =>
  APIService.private.post(`/api/courses/${courseId}/like`);

export const unlikeUserCourse = (courseId) =>
  APIService.private.delete(`/api/courses/${courseId}/like`);
